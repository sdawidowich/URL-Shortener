// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const urls = pgTable("url", {
    id: varchar("id", { length: 8 }).primaryKey(),
    link: text("link").notNull(),
    created_at: timestamp("created_at", { withTimezone: false }),
});

export const visits = pgTable("visit", {
    id: serial("id").primaryKey(),
    url_id: text("url_id")
        .references(() => urls.id)
        .notNull(),
    accessed: timestamp("accessed", { withTimezone: false }),
    browser: text("browser"),
    location: text("location"),
});
