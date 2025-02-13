# Use a base Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container
COPY . /app

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port where Flask runs
EXPOSE 5000

# Command to run the microservice with Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
