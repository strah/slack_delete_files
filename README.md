Batch delete files from Slack
===================


This node script allows you to easily bulk delete old files from the Slack archive.

----------


Installation 
-------------

1. Download files / clone the repository
1. Run `npm install`
1. Edit the script and update `token` and `domain` variables
1. Edit `dateLimit` variable (the default value is to delete all files that are older than 30 days)
1. Run `node delete_old_files.js`
1. Enjoy free space on Slack

## Credits
The code has been inspired by [Santiago L. Valdarrama's](https://www.shiftedup.com/2014/11/13/how-to-bulk-remove-files-from-slack) script in Python
