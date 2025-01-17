#!/bin/bash
mongoimport --host localhost --db spaceofsport_products --collection products --type json --file /data/products.json --jsonArray