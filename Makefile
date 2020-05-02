killable := $(shell docker ps -aq)

build:
	./build

rebuild:
	./build -f

run:
	docker-compose up -d

kill:
	docker kill ${killable}