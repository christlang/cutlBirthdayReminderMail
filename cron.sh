#!/bin/bash

#
# This script can be executed by cron once a day
#
# crontab -e # with user that can execute this script
#
# 5 0 * * * $HOME/projects/cutlBrithdayReminderMail/cron.sh

DIR=$HOME/projects/cutlBrithdayReminderMail
LOGDIR=$HOME/projects/cutlBrithdayReminderMail/log
LOG=$LOGDIR/simple.log

mkdir -p $LOGDIR
echo " " >> $LOG
echo " " >> $LOG
echo "$(date) start" >> $LOG

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

cd $DIR
nvm use >> $LOG
node index.js >> $LOG

echo "$(date) finished" >> $LOG


