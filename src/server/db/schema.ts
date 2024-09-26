// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { count, eq, sql } from "drizzle-orm";
import { boolean, integer, pgTable, pgView, serial, text, timestamp } from "drizzle-orm/pg-core";

// Tables
export const Users = pgTable("User", {
    id: text("id").primaryKey(),
    github_id: integer("github_id").unique(),
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
    id: serial("id").primaryKey(),
    key: text("key").unique().notNull(),
    url: text("url").notNull(),
    created_by: text("created_by")
        .references(() => Users.id)
        .notNull(),
    created_on: timestamp("created_on", { withTimezone: false }).notNull(),
});

export const Visits = pgTable("Visit", {
    id: serial("id").primaryKey(),
    url_id: integer("url_id")
        .references(() => Urls.id)
        .notNull(),
    accessed_on: timestamp("accessed_on", { withTimezone: false }).notNull(),
    browser: text("browser"),
    is_bot: boolean("is_bot"),
    device_type: text("device_type"),
    os: text("os")
});

// Views
export const UrlsView = pgView("Url_View")
    .as((qb) => qb.select({
        id: Urls.id,
        key: Urls.key,
        url: Urls.url,
        created_by: Urls.created_by,
        created_on: Urls.created_on,
        visits: count(Visits.id).as("visits")
    })
    .from(Urls)
    .leftJoin(Visits, eq(Visits.url_id, Urls.id))
    .groupBy(Urls.id, Urls.url, Urls.created_by, Urls.created_on));

export const VisitsCountView = pgView("VisitsCount_View")
    .as((qb) => qb.select({
        url_id: Visits.url_id,
        date: sql<string>`to_char(timestamp, 'YYYY-mm-dd')`.as("date"),
        visits: count(Visits.id).as("visits"),
    })
    .from(Visits)
    .groupBy(Visits.url_id,sql<string>`to_char(timestamp, 'YYYY-mm-dd')`));
    
export const VisitsHrCountView = pgView("VisitsHrCount_View")
    .as((qb) => qb.select({
        url_id: Visits.url_id,
        date: sql<string>`to_char(timestamp, 'YYYY-mm-dd HH24:00:00')`.as("date"),
        visits: count(Visits.id).as("visits"),
    })
    .from(Visits)
    .groupBy(Visits.url_id,sql<string>`to_char(timestamp, 'YYYY-mm-dd HH24:00:00')`));

// Object types
export type User = typeof Users.$inferSelect;
export type Session = typeof Sessions.$inferSelect;
export type Url = typeof Urls.$inferSelect;
export type Visit = typeof Visits.$inferSelect;
export type UrlView = {
    id: number,
    key: string,
    url: string,
    created_by: string,
    created_on: Date,
    visits: number
};
export type VisitCountView = {
    url_id: number,
    date: string,
    visits: number
};
export type VisitHrCountView = {
    url_id: number,
    date: string,
    visits: number
};