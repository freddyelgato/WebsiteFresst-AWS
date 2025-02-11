#!/bin/bash
mongoimport --host localhost --db spaceofsport_products --collection branches --type json --file /data/branches.json --jsonArray