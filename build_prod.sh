docker-compose -f docker/base.yml -f docker/prod.yml stop
docker-compose -f docker/base.yml -f docker/prod.yml build
docker-compose -f docker/base.yml -f docker/prod.yml up