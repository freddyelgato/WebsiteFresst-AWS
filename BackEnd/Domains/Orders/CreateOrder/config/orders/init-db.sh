#!/bin/bash
mongoimport --host localhost --db orders --collection orders --file /data/backup.json --jsonArray
echo "Database initialized successfully"