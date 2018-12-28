# Divi Project

## Learnings
- Omg, a lot can go wrong when scraping a website...
- python replacer works best
- use https://github.com/awslabs/git-secrets
- use https://douglasduhaime.com/posts/s3-lambda-auth.html to host an s3 bucket and password protect it
- use nohup instead of tmux, tmux hangs...
- directly stream files to S3 if possible!
- Be careful when you reupload a file, since cloudfront caches your stuff. You'll need to make an invalidation
- log success and errors... a lot can and will go wrong and you need to know what's happening
- and the alltime favourite: test test test...
- a cool trick for sharing between computers is gdocs
- don't be hasty, you'll loose time in the end...

## What's left

The original sitesucker files are at: divi-cdn/wb
The processed files are at: divi-cdn/w and e.g. accessible through http://d2zzfs4dhls0ll.cloudfront.net/w/atlas-of-architecture.html

Currently also the bersling divsaire thingy but marked for deletion...

# Scripts

## replacer.py

Used to process the html files... :)

## app...js
The original js with some mods by the master himself

## missing-files/direct-upload.js

A pretty cool thing that directly streams stuff to s3. ok makes temp files, but otherwise it's pretty cewl...

## manual/bachelor.ts

Makes batches :)

## missing-files/deploy.sh

runs some code on all servers listed in servers.txt - could be thought about doing this with a docker swarm for easier parallelization


