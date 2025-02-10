# Usar la imagen oficial de MariaDB más ligera
FROM mariadb:latest  

# Establecer variables de entorno
ENV MARIADB_ROOT_PASSWORD=rootpassword
ENV MARIADB_DATABASE=BranchesDB

# Exponer el puerto de MariaDB
EXPOSE 3306  

# Copiar el archivo SQL de inicialización al contenedor
COPY init.sql /docker-entrypoint-initdb.d/


