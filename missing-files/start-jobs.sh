echo "====================root@${ip}===$(hostname)=========================="

cd missing-files
#tmux ls
#kill -9 $(ps aux | grep '\snode\s' |e awk '{print $2}')
#ps -afe | grep node

#tmux new -d "node direct-upload.js ${ip}"
tmux ls
