IMAGE_NAME := rsv-platform
CONTAINER_NAME := rsv-platform
PORT := 3080

.PHONY: dev build docker-build docker-run docker-stop docker-restart logs clean deploy redeploy

dev:
	npm run dev

build:
	npm run build

docker-build:
	DOCKER_BUILDKIT=1 docker build -t $(IMAGE_NAME) .

docker-run:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):80 --restart unless-stopped $(IMAGE_NAME)

docker-stop:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

docker-restart: docker-stop docker-build docker-run

deploy: docker-build docker-run

redeploy: docker-stop deploy

logs:
	docker logs -f $(CONTAINER_NAME)

clean:
	rm -rf dist node_modules
	docker rmi $(IMAGE_NAME) 2>/dev/null || true
