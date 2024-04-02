
PORT=4200
JUMP_URL=http://localhost:4200/

run:
	PORT=${PORT} \
	JUMP_URL=${JUMP_URL} \
	ME=Deno \
		deno run \
			--allow-env \
			--allow-net \
			--watch \
			src/main.ts

start_jump:
	curl -X POST \
		http://localhost:${PORT}/start_jump \
		-d '{ "counter": 10 }' \
		-H 'content-type: application/json'

test_me:
	curl http://localhost:${PORT}/me
