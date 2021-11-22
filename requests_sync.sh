for i in {1..10}
do
    echo "Request # $i"
    curl --max-time 50 "http://localhost:3000/sync/100/$i"
done