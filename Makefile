up:
	docker-compose up -d --build
down:
	docker-compose down
down-all:
	docker-compose down --rmi all --volumes
api:
	docker-compose exec backend /bin/bash
api-test:
	docker-compose exec backend bundle exec rspec
db:
	docker-compose exec db /bin/bash
db-login:
	docker-compose exec db mysql -u root
