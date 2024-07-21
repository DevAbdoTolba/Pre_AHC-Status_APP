build: 
	cd ./back && docker-compose build

up: 
	cd ./back && docker-compose up

down:
	cd ./back && docker-compose down

i:
	cd ./front && yarn 

dev:
	cd ./front && yarn dev 