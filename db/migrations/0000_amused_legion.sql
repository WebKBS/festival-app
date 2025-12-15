CREATE TABLE `watch_list` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content_id` integer NOT NULL,
	`title` text NOT NULL,
	`image` text,
	`event_start_date` text,
	`event_end_date` text,
	`addr1` text,
	`addr2` text,
	`tel` text
);
