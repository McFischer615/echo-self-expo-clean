
-- Add missing name and description columns to twins table
ALTER TABLE public.twins 
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update any existing twins records to have empty strings for these fields if they're null
UPDATE public.twins 
SET name = COALESCE(name, ''),
    description = COALESCE(description, '')
WHERE name IS NULL OR description IS NULL;
