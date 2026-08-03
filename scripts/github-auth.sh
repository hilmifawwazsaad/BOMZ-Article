#!/bin/bash
# GitHub auth setup for BOMZ cron job
# Reads PAT from gh config and authenticates

TOKEN=$(grep "oauth_token:" /home/ubuntu/.config/gh/hosts.yml 2>/dev/null | awk '{print $2}' | head -1)

if [ -n "$TOKEN" ]; then
    echo "$TOKEN" | gh auth login --with-token
    if [ $? -eq 0 ]; then
        echo "GitHub auth successful"
    else
        echo "GitHub auth failed" >&2
        exit 1
    fi
else
    echo "No PAT found in gh config" >&2
    exit 1
fi
