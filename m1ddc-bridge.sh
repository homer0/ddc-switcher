#!/bin/sh -e

# Config

## The path to the built m1ddc library
## https://github.com/waydabber/m1ddc?tab=readme-ov-file#installation
M1DDC_BIN_FILE="./m1ddc-dev"
## The path to the file that will be used as a pipe to communicate with the m1ddc library
M1DDC_PIPE_FILE="./m1ddc-bridge-pipe"
## The prefix that will be used to identify the response of the command.
## This script will only respond to commands that do not start with this prefix.
M1DDC_RES_PREFIX="m1ddc-response:"
## The prefix that will be used to identify the error of the command.
M1DDC_ERROR_PREFIX="m1ddc-error:"

# Handlers

## List all displays
## Example:
## m1ddc_get_display_list
## [1] DELL U2723QE (SOME-UUID) (27) # (USB-C)
## [2] DELL U2723QE (SOME-UUID) (17) # (HDMI)
m1ddc_get_display_list() {
  DISPLAYS=$($M1DDC_BIN_FILE display list);
  while read -r DISPLAY; do
    # Split by space, take the first element, and remove the brackets
    DISPLAY_NUMBER=$(echo $DISPLAY | cut -d' ' -f1 | tr -d '[]')
    DISPLAY_INPUT=$($M1DDC_BIN_FILE display $DISPLAY_NUMBER get input)
    echo "$DISPLAY [$DISPLAY_INPUT]"
  done <<< "$DISPLAYS"
}

## Get the input number of a display
## Example:
## m1ddc_get_input 1
## 27 # (USB-C)
m1ddc_get_input() {
  DISPLAY_NUMBER=$1
  if [[ $DISPLAY_NUMBER =~ ^[0-9]+$ ]]; then
    $M1DDC_BIN_FILE display $1 get input;
  else
    echo "${M1DDC_ERROR_PREFIX}Invalid argument: $DISPLAY_NUMBER"
  fi
}

## Set the input number of a display
## Example:
## m1ddc_set_input 1 17
## 17 # (HDMI)
m1ddc_set_input() {
  DISPLAY_NUMBER=$1
  INPUT_NUMBER=$2
  if [[ $DISPLAY_NUMBER =~ ^[0-9]+$ ]] && [[ $INPUT_NUMBER =~ ^[0-9]+$ ]]; then
    $M1DDC_BIN_FILE display $1 set input $2;
  else
    echo "${M1DDC_ERROR_PREFIX}Invalid argument: $DISPLAY_NUMBER or $INPUT_NUMBER"
  fi
}

## Set the input number of a display (using alternate addressing, as used by LG)
## Example:
## m1ddc_set_input_alt 1 209
## 209 # (DisplayPort 2)
m1ddc_set_input_alt() {
  DISPLAY_NUMBER=$1
  INPUT_NUMBER=$2
  if [[ $DISPLAY_NUMBER =~ ^[0-9]+$ ]] && [[ $INPUT_NUMBER =~ ^[0-9]+$ ]]; then
    $M1DDC_BIN_FILE display $1 set input-alt $2;
  else
    echo "${M1DDC_ERROR_PREFIX}Invalid argument: $DISPLAY_NUMBER or $INPUT_NUMBER"
  fi
}

# Main

while true; do
  ## Make sure the pipe file exists
  if [ -f $M1DDC_PIPE_FILE ]; then
    M1DDC_CMD=$(cat $M1DDC_PIPE_FILE)
    ## If the command does not start with the response prefix, execute it
    if [[ ! $M1DDC_CMD == $M1DDC_RES_PREFIX* ]]; then
      M1DDC_RES=""
      case $M1DDC_CMD in
        "get-display-list")
          M1DDC_RES=$(m1ddc_get_display_list)
          ;;
        get-display-input:*)
          CMD_ARGS=${M1DDC_CMD#*:}
          M1DDC_RES=$(m1ddc_get_input $CMD_ARGS)
          ;;
        set-display-input:*)
          CMD_ARGS=${M1DDC_CMD#*:}
          INPUT_NUMBER=${CMD_ARGS#*:}
          DISPLAY_NUMBER=${CMD_ARGS%:*}
          M1DDC_RES=$(m1ddc_set_input $DISPLAY_NUMBER $INPUT_NUMBER)
          ;;
        set-display-input-alt:*)
          CMD_ARGS=${M1DDC_CMD#*:}
          INPUT_NUMBER=${CMD_ARGS#*:}
          DISPLAY_NUMBER=${CMD_ARGS%:*}
          M1DDC_RES=$(m1ddc_set_input_alt $DISPLAY_NUMBER $INPUT_NUMBER)
          ;;
        *)
          M1DDC_RES="${M1DDC_ERROR_PREFIX}Unknown command: $M1DDC_CMD"
          ;;
      esac
      echo "$M1DDC_RES_PREFIX$M1DDC_RES" > $M1DDC_PIPE_FILE
    fi
  fi
  sleep 1
done
