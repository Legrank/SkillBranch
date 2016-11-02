/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODE5YzgxNDJmYjc0ZDAwMTFiZTg2MjYiLCJ1c2VybmFtZSI6ImZseXUuZ3l1QHlhbmRleC5ydSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNDc4MDg0NjI5fQ.h26YAn77pMxPoOG6E_-6b80Pu1mrmV-YyE0H_5lTXkU';
var skb = new Skb(token);
skb.taskHelloWorld('Очень умное выражение');