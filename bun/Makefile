
PORT=4300
# I don't know why but bun can't work with localhost on macos
JUMP_URL=http://127.0.0.1:4300/

run:
	PORT=${PORT} \
	JUMP_URL=${JUMP_URL} \
	ME=Bun \
		bun --hot run src/main.ts

start_jump:
	curl -X POST \
		http://localhost:${PORT}/start_jump \
		-d '{ "counter": 3 }' \
		-H 'content-type: application/json'

test_me:
	curl http://localhost:${PORT}/me
