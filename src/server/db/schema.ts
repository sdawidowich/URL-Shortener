// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */


export const Users = pgTable("User", {
    id: varchar("id", { length: 8 }).primaryKey(),
    created_on: timestamp("created_on", { withTimezone: false }).notNull(),
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