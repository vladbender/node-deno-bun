
build:
	docker compose --env-file docker-compose.env build

run:
	docker compose --env-file docker-compose.env up -d

logs:
	docker compose --env-file docker-compose.env logs -f

clear:
	docker compose --env-file docker-compose.env down

start_jump:
	curl -X POST \
		http://localhost:3100/start_jump \
		-d '{ "counter": 10 }' \
		-H 'content-type: application/json'