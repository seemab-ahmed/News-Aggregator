# News Aggregator Application

This is a simple news aggregator application built using NGINX web server.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Docker](https://www.docker.com/get-started)

If Docker is not installed on your machine, you can download and install it from the official Docker website:
- [Docker Installation Guide](https://www.docker.com/get-started)

## Running the Application

Follow these steps to run the application using Docker:

1- Clone this repository to your local machine:
### `git clone https://github.com/seemab-ahmed/News-Aggregator.git`

2- Navigate to the project directory:
### `cd news-aggregator`

3- Build the Docker image using the provided Dockerfile:
### `docker build -t myapp .`

4- Run a Docker container using the built image:
### `docker run -d -p 3000:80 --name mycontainer myapp`

This command will start a container named "mycontainer" running the NGINX web server, and it will map port 80 of the container to port 80 on your local machine.

Open your web browser and navigate to  `http://localhost` to access the news aggregator application.

## Stopping the Application

To stop the running Docker container, use the following command:
### `docker stop mycontainer`

To remove the stopped container, use the following command:
### `docker rm mycontainer`

### Additional Information
If you encounter any issues or need further assistance, please contact seemab40615@gmail.com.
For more information about NGINX, visit the NGINX Documentation.
