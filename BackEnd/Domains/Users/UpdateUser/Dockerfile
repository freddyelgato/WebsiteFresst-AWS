# Use a base Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy your project files to the container
COPY . /app

# Install the necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port where Flask runs
EXPOSE 5002

# Command to run the microservice with Gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5002"]
