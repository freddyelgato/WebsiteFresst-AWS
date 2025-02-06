#!/bin/bash
mongoimport --host 34.228.111.178 --db spaceofsport_products --collection products --type json --file /data/products.json --jsonArray
