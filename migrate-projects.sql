-- Rename the table from 'page' to 'project' if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'page') THEN
        ALTER TABLE "page" RENAME TO "project";
    END IF;
END $$;
