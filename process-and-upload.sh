tar -cvzf wb.tar.gz wb > archive.log
echo "Done archiving"
python replacer.py
echo "Done replacing"
aws s3 cp ./wb s3://divi-cdn/w --recursive > upload.log
echo "Done uploading"
