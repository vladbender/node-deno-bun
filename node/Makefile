
PORT=4100
#JUMP_URL=http://localhost:4100/
JUMP_URL=http://127.0.0.1:4100/

run:
	npm run build && \
	PORT=${PORT} \
	JUMP_URL=${JUMP_URL} \
	ME=Node \
	npm run start

run_bun:
	PORT=${PORT} \
	JUMP_URL=${JUMP_URL} \
	ME=NodeBun \
	bun run src/main.ts

start_jump:
	curl -X POST \
		http://localhost:${PORT}/start_jump \
		-d '{ "counter": 3 }' \
		-H 'content-type: application/json'

test_me:
	curl http://localhost:${PORT}/me
