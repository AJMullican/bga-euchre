/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * euchreajm implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * euchreajm.js
 *
 * euchreajm user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
],
function (dojo, declare) {
    return declare("bgagame.euchreajm", ebg.core.gamegui, {
        constructor: function(){
            console.log('euchreajm constructor');
              
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;
            this.cardwidth = 72;
            this.cardheight = 96;
        },
        
        /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
			console.log(gamedatas);
            
            var stateId = parseInt(gamedatas.gamestate.id);
            console.log("AJM stateId: " + stateId);

            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
            }
            
            var trumpTable = document.getElementById("trumptable");
            //var trumpTable = $('trumptable').innerHTML;
            var style = window.getComputedStyle(trumpTable, null);
            console.log("TRUMP TABLE STYLE: ");
            console.log(style);

            var aPlayerTable = document.getElementsByClassName("playertable");
            style = window.getComputedStyle(aPlayerTable[0], null);

            var aPlayerTable = document.getElementsByClassName("playertablecard");
            style = window.getComputedStyle(aPlayerTable[0], null);

            var stateId = parseInt(gamedatas.gamestate.id);
            console.log("stateId: " + stateId);
            if( stateId <= 30 )   //everything up to Dealer Replace
            {
                for( var i=0; i<aPlayerTable.length; i++ )
                {
                  aPlayerTable[i].style.display = 'none';
                }
            }
            else
            {
                trumpTable.style.display = 'none';
            }
                for( var i=0; i<aPlayerTable.length; i++ )
                {
                  aPlayerTable[i].style.display = 'block';
                }
                //trumpTable.style.display = 'block';
            console.log("playertable display: none");
            dojo.query( '.playertable' ).style( 'display', 'block' );
            dojo.query( '.playername' ).style( 'display', 'block' );
            dojo.query( '.trumptable' ).style( 'display', 'block' );
            //dojo.query( '#myhand' ).style( 'display', 'block' );

            // TODO: Set up your game interface here, according to "gamedatas"

            // Player hand
            this.playerHand = new ebg.stock(); // new stock object for hand
            this.playerHand.create( this, $('myhand'), this.cardwidth, this.cardheight );
 
            this.playerHand.image_items_per_row = 13; // 13 images per row
            this.playerHand.centerItems = true;

            this.trumpCard = new ebg.stock(); // new stock object for trump card
            this.trumpCard.create( this, $('trumptablecard'), this.cardwidth, this.cardheight );

            // Create cards types:
            for (var color = 1; color <= 4; color++) {
                for (var value = 2; value <= 14; value++) {
                    // Build card type id
                    var card_type_id = this.getCardUniqueId(color, value);
                    this.playerHand.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards.jpg', card_type_id);
                    this.trumpCard.addItemType(card_type_id, card_type_id, g_gamethemeurl + 'img/cards.jpg', card_type_id);
                }
            }
            //  Spades trump
            this.playerHand.changeItemsWeight({
                                                 0 : 39,
                                                    1 : 40,
                                                    2 : 41,
                                                    3 : 42,
                                                    4 : 43,
                                                    5 : 44,
                                                    6 : 45,
                                                    7 : 46,
                                                    8 : 47,
                                                    9 : 48,
                                                   10 : 49,
                                                   11 : 50,
                                                   12 : 51,
                                                   13 : 26,
                                                   14 : 27,
                                                   15 : 28,
                                                   16 : 29,
                                                   17 : 30,
                                                   18 : 31,
                                                   19 : 32,
                                                   20 : 33,
                                                   21 : 34,
                                                   22 : 35,
                                                   23 : 36,
                                                   24 : 37,
                                                   25 : 38,
                                                   26 : 13,
                                                   27 : 14,
                                                   28 : 15,
                                                   29 : 16,
                                                   30 : 17,
                                                   31 : 18,
                                                   32 : 19,
                                                   33 : 20,
                                                   34 : 21,
                                                   35 : 22,
                                                   36 : 23,
                                                   37 : 24,
                                                   38 : 25,
                                                   39 : 0,
                                                   40 : 1,
                                                   41 : 2,
                                                   42 : 3,
                                                   43 : 4,
                                                   44 : 5,
                                                   45 : 6,
                                                   46 : 7,
                                                   47 : 8,
                                                   48 : 9,
                                                   49 : 10,
                                                   50 : 11,
                                                   51 : 12
                                                        });

            // Cards in player's hand
            for ( var i in this.gamedatas.hand) {
                var card = this.gamedatas.hand[i];
                var color = card.type;
                var value = card.type_arg;
                this.playerHand.addToStockWithId(this.getCardUniqueId(color, value), card.id);
console.log("AJM card number player_id, id: " + card.location_arg, ", " + card.id);
            }

            // Cards played on table
            for (i in this.gamedatas.cardsontable) {
                var card = this.gamedatas.cardsontable[i];
                var color = card.type;
                var value = card.type_arg;
                var player_id = card.location_arg;
                this.playCardOnTable(player_id, color, value, card.id);
            }

console.log("AJM about to iCard");
                for( var iCard in gamedatas.trumptablecard )//there will only ever be one...
                {
console.log("AJM iCard: " + iCard);
                    var c = gamedatas.trumptablecard[iCard];
                    var suit = parseInt(c.type);
                    var val = parseInt(c.type_arg);
                    this.trumpCard.addToStockWithId( this.getCardUniqueId( suit, val ), 1 );
            //this.trumpCard.addToStockWithId(this.getCardUniqueId(color, value), card.id);
                }
/*
*/

            dojo.connect( this.playerHand, 'onChangeSelection', this, 'onPlayerHandSelectionChanged' );


            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
console.log("AJM this.isCurrentPlayerActive "+this.isCurrentPlayerActive());
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */

        // Get card unique identifier based on its color and value
        getCardUniqueId : function(color, value)
        {
            return (color - 1) * 13 + (value - 2);
        },

        playCardOnTable : function(player_id, color, value, card_id)
        {
            // player_id => direction
            dojo.place(this.format_block('jstpl_cardontable', {
                x : this.cardwidth * (value - 2),
                y : this.cardheight * (color - 1),
                player_id : player_id
            }), 'playertablecard_' + player_id);

            if (player_id != this.player_id) {
                // Some opponent played a card
                // Move card from player panel
                this.placeOnObject('cardontable_' + player_id, 'overall_player_board_' + player_id);
            } else {
                // You played a card. If it exists in your hand, move card from there and remove
                // corresponding item

                if ($('myhand_item_' + card_id)) {
                    this.placeOnObject('cardontable_' + player_id, 'myhand_item_' + card_id);
                    this.playerHand.removeFromStockById(card_id);
                }
            }

            // In any case: move it to its final destination
            this.slideToObject('cardontable_' + player_id, 'playertablecard_' + player_id).play();
        },

        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */
        
        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/euchreajm/euchreajm/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */

        onPlayerHandSelectionChanged : function() {
            var items = this.playerHand.getSelectedItems();

            if (items.length > 0) {
                var action = 'playCard';
                if (this.checkAction(action, true)) {
                    // Can play a card
                    var card_id = items[0].id;                    
                    this.ajaxcall("/" + this.game_name + "/" + this.game_name + "/" + action + ".html", {
                        id : card_id,
                        lock : true
                    }, this, function(result) {
                    }, function(is_error) {
                    });

                    this.playerHand.unselectAll();
                } else if (this.checkAction('giveCards')) {
                    // Can give cards => let the player select some cards
                } else {
                    this.playerHand.unselectAll();
                }
            }
        },

        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your euchreajm.game.php file.
        
        */
        setupNotifications : function() {
            console.log('notifications subscriptions setup');

            dojo.subscribe('dealerChosen', this, "notif_dealerChosen");
            dojo.subscribe('newHand', this, "notif_newHand");
            dojo.subscribe('playCard', this, "notif_playCard");

            dojo.subscribe( 'trickWin', this, "notif_trickWin" );
            this.notifqueue.setSynchronous( 'trickWin', 1000 );
            dojo.subscribe( 'giveAllCardsToPlayer', this, "notif_giveAllCardsToPlayer" );

            dojo.subscribe( 'newScores', this, "notif_newScores" );
        },

        notif_dealerChosen : function(notif) {
            // We received the dealer ID
			$dealer_id = notif.args.id[0];
            console.log('AJM notif_dealer_chosen: '+$dealer_id);
        },

        notif_newHand : function(notif) {
            console.log('AJM notif_newHand');
            // We received a new full hand of 5 cards.
            this.playerHand.removeAll();

            for ( var i in notif.args.cards) {
                var card = notif.args.cards[i];
                var color = card.type;
                var value = card.type_arg;
                this.playerHand.addToStockWithId(this.getCardUniqueId(color, value), card.id);
            }
        },

        notif_playCard : function(notif) {
            console.log('AJM notif_playCard');
            // Play a card on the table
            this.playCardOnTable(notif.args.player_id, notif.args.color, notif.args.value, notif.args.card_id);
        },

        // TODO: from this point and below, you can write your game notifications handling methods
        
        notif_trickWin : function(notif) {
            // We do nothing here (just wait in order players can view the 4 cards played before they're gone.
        },

        notif_giveAllCardsToPlayer : function(notif) {
            console.log('AJM notif_giveAllCardsToPlayer');
            // Move all cards on table to given table, then destroy them
            var winner_id = notif.args.player_id;
            for ( var player_id in this.gamedatas.players) {
                var anim = this.slideToObject('cardontable_' + player_id, 'overall_player_board_' + winner_id);
                dojo.connect(anim, 'onEnd', function(node) {
                    dojo.destroy(node);
                });
                anim.play();
            }
        },

        notif_newScores : function(notif) {
           // Update players' scores
           for ( var player_id in notif.args.newScores) {
               this.scoreCtrl[player_id].toValue(notif.args.newScores[player_id]);
           }
        },

        /*
        Example:
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});
