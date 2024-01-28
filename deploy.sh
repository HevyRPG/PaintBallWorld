echo "Switching to branch master"
git checkout master

echo "Building app..."

npm run build

echo "Deploying to server.."

scp -r dist/* reactadmin@192.168.1.190:/var/www/pw.whyza.org/

echo "Done!"