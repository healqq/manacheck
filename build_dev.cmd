docker-compose -f docker/base.yml -f docker/dev.yml stop
docker-compose -f docker/base.yml -f docker/dev.yml build
docker-compose -f docker/base.yml -f docker/dev.yml up