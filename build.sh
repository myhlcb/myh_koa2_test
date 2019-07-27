tag=$(date +%Y%m%d%H%S)
image=koa_test:tag
echo $image
docker build -t $image .
docker stop koa_test
docker rm koa_test
docker run -d --name koa_test -p 3000:3000 $image