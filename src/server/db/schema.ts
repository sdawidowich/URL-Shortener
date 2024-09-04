// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { count, eq } from "drizzle-orm";
import { numeric, pgTable, pgView, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Tables
export const Users = pgTable("User", {
    id: text("id").primaryKey(),
    github_id: numeric("github_id").unique(),
    username: text("username").notNull(),
    created_on: timestamp("created_on", { withTimezone: false }).notNull(),
});

export const Sessions = pgTable("Session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => Users.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true
	}).notNull()
});

export const Urls = pgTable("Url", {
    id: varchar("id", { length: 8 }).primaryKey(),
    url: text("url").notNull(),
    created_by: varchar("created_by", { length: 32 })
        .references(() => Users.id)
        .notNull(),
    created_on: timestamp("created_on", { withTimezone: false }).notNull(),
});

export const Visits = pgTable("Visit", {
    id: serial("id").primaryKey(),
    url_id: text("url_id")
        .references(() => Urls.id)
        .notNull(),
    accessed_on: timestamp("accessed_on", { withTimezone: false }),
    browser: text("browser"),
    location: text("location"),
});

// Views
export const UrlsView = pgView("Url_View")
    .as((qb) => qb.select({
        id: Urls.id,
        url: Urls.url,
        created_by: Urls.created_by,
        created_on: Urls.created_on,
        visits: count(Visits.id).as("visits")
    })
    .from(Urls)
    .leftJoin(Visits, eq(Visits.url_id, Urls.id))
    .groupBy(Urls.id, Urls.url, Urls.created_by, Urls.created_on));

// Object types
export type User = typeof Users.$inferSelect;
export type Session = typeof Sessions.$inferSelect;
export type Url = typeof Urls.$inferSelect;
export type Visit = typeof Visits.$inferSelect;
export type UrlView = {
    id: string,
    url: string,
    created_by: string,
    created_on: Date,
    visits: number
};