up:
	docker-compose up -d --build \
	&& docker-compose exec backend bin/rails db:prepare
down:
	docker-compose down
down-all:
	docker-compose down --rmi all --volumes
web:
	docker-compose exec frontend /bin/bash
web-test:
	docker-compose exec frontend npm run test
api:
	docker-compose exec backend /bin/bash
api-test:
	docker-compose exec backend bundle exec rspec
db:
	docker-compose exec db /bin/bash
db-login:
	docker-compose exec db mysql -u root
