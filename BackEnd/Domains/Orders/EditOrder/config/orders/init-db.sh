#!/bin/bash
mongoimport --host localhost --db orders --collection UpdateOrder --file /data/backup.json --jsonArray
echo "Database initialized successfully"