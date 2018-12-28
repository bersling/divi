import os, fnmatch
def findReplace(directory, find, replace, filePattern):
    for path, dirs, files in os.walk(os.path.abspath(directory)):
        for filename in fnmatch.filter(files, filePattern):
            filepath = os.path.join(path, filename)
            with open(filepath) as f:
                s = f.read()
            s = s.replace(find, replace)
            with open(filepath, "w") as f:
                f.write(s)


findReplace("./wb", "data-src=\"https://divisare-res.cloudinary.com/images/dpr_auto,f_auto,q_auto,w_auto", "src=\"https://d2zzfs4dhls0ll.cloudfront.net/images", "*.html")
findReplace("./wb", "data-src=\"https://divisare-res.cloudinary.com/images/f_auto,q_auto,w_auto", "src=\"https://d2zzfs4dhls0ll.cloudfront.net/images", "*.html")
findReplace("./wb", "data-src=\"https://divisare-res.cloudinary.com/images/c_limit,f_auto,h_2000,q_auto,w_3000", "src=\"https://d2zzfs4dhls0ll.cloudfront.net/images", "*.html")
findReplace("./wb", "ga('create', \"UA-111791-6\", 'auto');", " ", "*.html")
findReplace("./wb", "ga('send', 'pageview');", " ", "*.html")

print("Done replacing")

