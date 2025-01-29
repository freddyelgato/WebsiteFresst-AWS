#!/bin/bash
mongoimport --host localhost --db orders --collection GetOrder --file /data/backup.json --jsonArray
echo "Database initialized successfully"