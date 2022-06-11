import React, { useState } from "react";
import MainLayout from "../../../components/MainLayout";
import { font, font2 } from "./utils/fonts";
import { aboutContentImage, aboutWindowImage, backgroundImage, betBarImage, btnAboutImage, btnClearImage, btnDealImage, btnFullscreenImage, btnMenuImage, btnPlayImage, btnSoundImage, btnStandImage, cardBackImage, cardClubTenImage, cardClubAImage, cardClubTwoImage, cardClubThreeImage, cardClubFourImage, cardClubFiveImage, cardClubSixImage, cardClubSevenImage, cardClubEightImage, cardClubNineImage, cardClubJImage, cardClubKImage, cardClubQImage, cardDiamondTenImage, cardDiamondAImage, cardDiamondTwoImage, cardDiamondThreeImage, cardDiamondFourImage, cardDiamondFiveImage, cardDiamondSixImage, cardDiamondSevenImage, cardDiamondEightImage, cardDiamondNineImage, cardDiamondJImage, cardDiamondKImage, cardDiamondQImage, cardHeartTenImage, cardHeartAImage, cardHeartTwoImage, cardHeartThreeImage, cardHeartFourImage, cardHeartFiveImage, cardHeartSixImage, cardHeartSevenImage, cardHeartEightImage, cardHeartNineImage, cardHeartJImage, cardHeartKImage, cardHeartQImage, cardsImage, cardSpadeTenImage, cardSpadeAImage, cardSpadeTwoImage, cardSpadeThreeImage, cardSpadeFourImage, cardSpadeFiveImage, cardSpadeSixImage, cardSpadeSevenImage, cardSpadeEightImage, cardSpadeNineImage, cardSpadeJImage, cardSpadeKImage, cardSpadeQImage, cardValueImage, chipsImage, chipsStackImage, gameTitleImage, highlightImage, historyImage, loseImage, moneyBarImage, selectedBankerImage, selectedPlayerImage, selectedTieImage, tieImage, totalBetBarImage, txtBankerImage, txtPlayerImage, winImage } from "./utils/images";
import { cardPlaceMfa, cardPlaceOgg, cardShoveMfa, cardShoveOgg, chipsCollideMfa, chipsCollideOgg, chipsHandleMfa, chipsHandleOgg, clickMfa, clickOgg, tieMfa, tieOgg, youLoseMfa, youLoseOgg, youWinMfa, youWinOgg } from "./utils/sounds";
import { useAuthContext } from "../../../context/AuthContext";
import "./index.css";
import { playBaccarat } from "../../../services/web2/baccarat";
import { getTemporalWalletBalance } from "../../../services/web2/temporalWallet";
import { getAuthMessage, getAuthMessageSignature } from "../../../utils/functions/authMessage";
import { toast } from "react-toastify";

class BaccaratCanvas extends React.Component {

	constructor() {
		super();		
		this.is_ready = true;
		this.chips_ready = true;
		this.sound_enable = true;
		this.cur_player = "player";
		this.audio_format = 'ogg';
		this.is_fullscreen = false;
		this.save_money = false; //Set "true" if you want to save current player money using localStorage
		this.reload_money = true; //Reload money if player lose and current money are 0
		this.reload_money_amount = 500;
		this.chips_move = new window.createjs.Container();
		this.card_back = new window.createjs.Container();
		this.chips = new window.createjs.Container();
		this.is_tween = false;
		this.is_ready = true;
		this.cards = new window.createjs.Container();
		this.cur_cash = 0;
		this.player_natural = false;
		this.dealer_natural = false;
		this.highlights = new window.createjs.Container();
		this.selected = new window.createjs.Container();
		this.selected_opt = "player";
		this.cur_pos = [0,0];
		this.bet_bar = new window.createjs.Container();
		this.bet_txts = new window.createjs.Container();
		this.txt_history = new window.createjs.Container();
		this.bet_value = [0,0,0];
		this.history_value = [];

		this.player_hit_count = 0;
		this.dealer_hit_count = 0;
		this.triggers = [];
	}

	componentDidMount () {
		this.canvas = document.getElementById("canvas");
		this.stage = new window.createjs.Stage(this.canvas);
		this.load();
		window.addEventListener("resize", this.resizeGame);
		this.resizeGame();
	}

	load () {
		window.createjs.Ticker.timingMode = window.createjs.Ticker.RAF;
		window.createjs.Ticker.on("tick", () => this.stage.update());

		let bg = new window.createjs.Bitmap(backgroundImage);

		this.progressbar = new window.createjs.Shape();
		this.progressbar.graphics.beginFill("white").drawRect(0,0,752,22);
		this.progressbar.setTransform(264, 450);

		let border = new window.createjs.Shape();
		border.graphics.beginStroke("white").drawRect(0,0,760,30);
		border.setTransform(260, 446);

		let title = new window.createjs.Bitmap(gameTitleImage);
		title.setTransform(630, 290);
		title.regX = 732/2;
		title.regY = 312/2;

		this.stage.addChild(bg, title, this.progressbar, border);

		let manifest = [
			{src:backgroundImage, id: "bgMenu"},
			{src:aboutWindowImage, id: "about_window"},
			{src:aboutContentImage, id: "about_content"},
			{src:moneyBarImage, id: "moneyBar"},
			{src:btnMenuImage, id: "btnMenu"},
			{src:btnAboutImage, id: "btnAbout"},
			{src:btnFullscreenImage, id: "btnFullscreen"},
			{src:btnSoundImage, id: "btnSound"},
			{src:btnPlayImage, id: "btn_play"},
			{src:btnClearImage, id: "btn_clear"},
			{src:gameTitleImage, id: "game_title"},
			{src:cardsImage, id: "_cards"},
			{src:btnStandImage, id: "btn_stand"},
			{src:btnDealImage, id: "btn_deal"},
			{src:betBarImage, id: "bet_bar"},
			{src:chipsImage, id: "chips"},
			{src:chipsStackImage, id: "chips_stack"},
			{src:txtPlayerImage, id: "txt_player"},
			{src:txtBankerImage, id: "txt_banker"},
			{src:cardValueImage, id: "card_value"},
			{src:totalBetBarImage, id: "total_bet_bar"},
			{src:historyImage, id: "history"},
			{src:highlightImage, id: "highlight"},
			{src:selectedPlayerImage, id: "selected_player"},
			{src:selectedTieImage, id: "selected_tie"},
			{src:selectedBankerImage, id: "selected_banker"},
			{src:tieImage, id: "tie"},
			{src:winImage, id: "win"},
			{src:loseImage, id: "lose"},
			{src:cardClubTwoImage, id:"card-club-2"},
			{src:cardClubThreeImage, id:"card-club-3"},
			{src:cardClubFourImage, id:"card-club-4"},
			{src:cardClubFiveImage, id:"card-club-5"},
			{src:cardClubSixImage, id:"card-club-6"},
			{src:cardClubSevenImage, id:"card-club-7"},
			{src:cardClubEightImage, id:"card-club-8"},
			{src:cardClubNineImage, id:"card-club-9"},
			{src:cardClubTenImage, id:"card-club-10"},
			{src:cardClubAImage, id:"card-club-1"},
			{src:cardClubJImage, id:"card-club-11"},
			{src:cardClubQImage, id:"card-club-12"},
			{src:cardClubKImage, id:"card-club-13"},
			{src:cardDiamondTwoImage, id:"card-diamond-2"},
			{src:cardDiamondThreeImage, id:"card-diamond-3"},
			{src:cardDiamondFourImage, id:"card-diamond-4"},
			{src:cardDiamondFiveImage, id:"card-diamond-5"},
			{src:cardDiamondSixImage, id:"card-diamond-6"},
			{src:cardDiamondSevenImage, id:"card-diamond-7"},
			{src:cardDiamondEightImage, id:"card-diamond-8"},
			{src:cardDiamondNineImage, id:"card-diamond-9"},
			{src:cardDiamondTenImage, id:"card-diamond-10"},
			{src:cardDiamondAImage, id:"card-diamond-1"},
			{src:cardDiamondJImage, id:"card-diamond-11"},
			{src:cardDiamondQImage, id:"card-diamond-12"},
			{src:cardDiamondKImage, id:"card-diamond-13"},
			{src:cardHeartTwoImage, id:"card-heart-2"},
			{src:cardHeartThreeImage, id:"card-heart-3"},
			{src:cardHeartFourImage, id:"card-heart-4"},
			{src:cardHeartFiveImage, id:"card-heart-5"},
			{src:cardHeartSixImage, id:"card-heart-6"},
			{src:cardHeartSevenImage, id:"card-heart-7"},
			{src:cardHeartEightImage, id:"card-heart-8"},
			{src:cardHeartNineImage, id:"card-heart-9"},
			{src:cardHeartTenImage, id:"card-heart-10"},
			{src:cardHeartAImage, id:"card-heart-1"},
			{src:cardHeartJImage, id:"card-heart-11"},
			{src:cardHeartQImage, id:"card-heart-12"},
			{src:cardHeartKImage, id:"card-heart-13"},
			{src:cardSpadeTwoImage, id:"card-spade-2"},
			{src:cardSpadeThreeImage, id:"card-spade-3"},
			{src:cardSpadeFourImage, id:"card-spade-4"},
			{src:cardSpadeFiveImage, id:"card-spade-5"},
			{src:cardSpadeSixImage, id:"card-spade-6"},
			{src:cardSpadeSevenImage, id:"card-spade-7"},
			{src:cardSpadeEightImage, id:"card-spade-8"},
			{src:cardSpadeNineImage, id:"card-spade-9"},
			{src:cardSpadeTenImage, id:"card-spade-10"},
			{src:cardSpadeAImage, id:"card-spade-1"},
			{src:cardSpadeJImage, id:"card-spade-11"},
			{src:cardSpadeQImage, id:"card-spade-12"},
			{src:cardSpadeKImage, id:"card-spade-13"},
			{src:cardBackImage, id:"card_back_img"},
			{src:clickOgg, id:"Click_ogg"},
			{src:cardPlaceOgg, id:"cardPlace_ogg"},
			{src:chipsCollideOgg, id:"chipsCollide_ogg"},
			{src:chipsHandleOgg, id:"chipsHandle_ogg"},
			{src:cardShoveOgg, id:"cardShove_ogg"},
			{src:tieOgg, id:"Tie_ogg"},
			{src:youWinOgg, id:"youwin_ogg"},
			{src:youLoseOgg, id:"youlose_ogg"},
			{src:clickMfa, id:"Click_m4a"},
			{src:cardPlaceMfa, id:"cardPlace_m4a"},
			{src:chipsCollideMfa, id:"chipsCollide_m4a"},
			{src:chipsHandleMfa, id:"chipsHandle_m4a"},
			{src:cardShoveMfa, id:"cardShove_m4a"},
			{src:tieMfa, id:"Tie_m4a"},
			{src:youWinMfa, id:"youwin_m4a"},
			{src:youLoseMfa, id:"youlose_m4a"},
		];

		this.preload = new window.createjs.LoadQueue(true);
		this.preload.installPlugin(window.createjs.Sound);
		this.preload.on("complete", this.loaded.bind(this));
		this.preload.on("progress", this.onLoad.bind(this));
		this.preload.loadManifest(manifest);
	}

	onLoad() {
		this.progressbar.scaleX = this.preload.progress;
	}

	loaded() {
		this.stage.removeAllChildren();
		//Check audio format supported
		if(document.createElement('audio').canPlayType('audio/ogg; codecs="vorbis"') === ''){
			//Ogg not supported
			this.audio_format = 'm4a';
		}
		this.initialize();
	}

	initialize() {
		this.font = new window.createjs.SpriteSheet({
			"animations": {
				"0": {"frames": [0]},
				"1": {"frames": [1]},
				"2": {"frames": [2]},
				"3": {"frames": [3]},
				"4": {"frames": [4]},
				"5": {"frames": [5]},
				"6": {"frames": [6]},
				"7": {"frames": [7]},
				"8": {"frames": [8]},
				"9": {"frames": [9]},
			},
			"images": [font],
			"frames": {"width":27,"height":44,"count":10,"regX":27/2,"regY":44/2}
		});
		this.font2 = new window.createjs.SpriteSheet({
			"animations": {
				"0": {"frames": [0]},
				"1": {"frames": [1]},
				"2": {"frames": [2]},
				"3": {"frames": [3]},
				"4": {"frames": [4]},
				"5": {"frames": [5]},
				"6": {"frames": [6]},
				"7": {"frames": [7]},
				"8": {"frames": [8]},
				"9": {"frames": [9]},
			},
			"images": [font2],
			"frames": {"width":27,"height":44,"count":10,"regX":27/2,"regY":44/2}
		});
		this.toMenu();
	}

	img(e) {
		return this.preload.getResult(e);
	}

	center(obj) {
		obj.regX = obj.getBounds().width/2;
		obj.regY = obj.getBounds().height/2;
	}

	playSound(id) {
		if (this.sound_enable) {
			window.createjs.Sound.play(id+"_"+this.audio_format);
		}
	}

	toMenu() {
		this.gameState = "menu";

		let background = new window.createjs.Bitmap(this.img("bgMenu"));

		let title = new window.createjs.Bitmap(this.img("game_title"));
		title.setTransform(630, 290);
		title.regX = title.getBounds().width/2;
		title.regY = title.getBounds().height/2;

		this.b_play = new window.createjs.Bitmap(this.img("btn_play"));
		this.b_play.setTransform(640, 500);
		this.b_play.regX = this.b_play.getBounds().width/2;
		this.b_play.regY = this.b_play.getBounds().height/2;

		this.stage.addChild(background, this.b_play, title);

		this.b_play.on("click", function(e){
			this.playSound("Click");
			window.createjs.Tween.get(e.target)
				.to({scaleX: 0.9,scaleY:0.9},100)
				.to({scaleX: 1,scaleY:1},100)
				.call(this.toGame.bind(this));
			}.bind(this));

		//Load saved money if localStorage (this.save_money) "true".
		// if(this.save_money){
		// 	let saved_cash = localStorage.getItem("cash");
		// 	if(saved_cash !== null){
		// 		this.cur_cash = saved_cash;
		// 	}
		// } WILL REMOVE THIS

		this.getHeader();
	}

	toGame() {
		this.stage.removeAllChildren();
		this.gameState = "game";
		this.selected_opt = "player";

		let background = new window.createjs.Bitmap(this.img("bgMenu"));

		let t_player = new window.createjs.Bitmap(this.img("txt_player"));
		t_player.setTransform(464, 340);
		this.center(t_player);

		let t_banker = new window.createjs.Bitmap(this.img("txt_banker"));
		t_banker.setTransform(816, 340);
		this.center(t_banker);

		let h_player = new window.createjs.Bitmap(this.img("highlight"));
		h_player.setTransform(464, 448);
		h_player.name = "player";
		h_player.alpha = 0.05;
		this.center(h_player);

		let h_tie = new window.createjs.Bitmap(this.img("highlight"));
		h_tie.setTransform(640, 468);
		h_tie.name = "tie";
		h_tie.alpha = 0.05;
		this.center(h_tie);

		let h_banker = new window.createjs.Bitmap(this.img("highlight"));
		h_banker.setTransform(816, 448);
		h_banker.name = "banker";
		h_banker.alpha = 0.05;
		this.center(h_banker);

		this.highlights.addChild(h_player, h_tie, h_banker);

		for(let i=0; i<3; i++) {
			let child = this.highlights.getChildAt(i);
			let hit = new window.createjs.Shape();
			hit.graphics.beginFill("#000").drawRect(0, 0, child.getBounds().width, child.getBounds().height);
			child.hitArea = hit;
		}
		this.highlights.on("click", function(e) {
			this.selectedOption(e.target.name);
		}.bind(this));

		for(let i=0; i<3; i++) {
			let child = this.highlights.getChildAt(i);
			let s = new window.createjs.Bitmap(this.img("selected_"+child.name));
			s.setTransform(child.x, child.y);
			s.name = child.name;
			this.center(s);
			if(child.name === "player") {
				child.alpha = 1;
				this.cur_pos[0] = s.x;
				this.cur_pos[1] = s.y;
			}
			this.selected.addChild(s);
		}

		for(let i=0; i<3; i++) {
			let child = this.highlights.getChildAt(i);
			let s = new window.createjs.Bitmap(this.img("bet_bar"));
			s.setTransform(child.x, child.y);
			s.alpha = 0;
			s.name = child.name;
			this.center(s);
			s.y += 90;
			this.bet_bar.addChild(s);
		}

		for(let i=0; i<3; i++) {
			let child = this.bet_bar.getChildAt(i);
			let s = new window.createjs.BitmapText("", this.font2);
			s.textAlign = "center";
			s.setTransform(child.x, child.y);
			s.name = child.name;
			s.scaleX = s.scaleY = 0.7;
			this.bet_txts.addChild(s);
		}

		let history = new window.createjs.Bitmap(this.img("history"));
		history.setTransform(1168, 240);
		this.center(history);

		let start_x = 1136;
		let start_y = 182;
		let space_x = 64;
		let space_y = 33;
		let count_x = 0;
		let count_y = 0;

		for(let i=0; i<10; i++) {
			let s = new window.createjs.BitmapText("", this.font2);
			s.textAlign = "center"
			s.setTransform(start_x + (space_x * count_x), start_y + (space_y * count_y));
			s.id = i;
			s.scaleX = s.scaleY = 0.6;
			this.txt_history.addChild(s);

			count_x++;
			if (count_x === 2) {
				count_y++;
				count_x = 0;
			}
		}

		this.value_bar_1 = new window.createjs.Bitmap(this.img("card_value"));
		this.value_bar_1.setTransform(400, 280);
		this.center(this.value_bar_1);

		this.value_bar_2 = new window.createjs.Bitmap(this.img("card_value"));
		this.value_bar_2.setTransform(720, 280);
		this.center(this.value_bar_2);

		this.card_pack = new window.createjs.Bitmap(this.img("_cards"));
		this.card_pack.setTransform(160, 280);
		this.card_pack.regX = this.card_pack.getBounds().width/2;
		this.card_pack.regY = this.card_pack.getBounds().height/2;

		let betBar = new window.createjs.Bitmap(this.img("total_bet_bar"));
		betBar.setTransform(1050, 478);
		this.center(betBar);

		this.bet = 0;

		this.txt_bet = new window.createjs.BitmapText(this.bet.toString(), this.font);
		this.txt_bet.textAlign = "center";
		this.txt_bet.setTransform(1040, 478);
		this.txt_bet.scaleX = this.txt_bet.scaleY = 0.85;

		this.b_clear = new window.createjs.Bitmap(this.img("btn_clear"));
		this.b_clear.setTransform(1160, 478);
		this.b_clear.regX = this.b_clear.getBounds().width/2;
		this.b_clear.regY = this.b_clear.getBounds().height/2;

		this.b_clear.on("click", function() {
			this.bet = 0;
			this.updateBetChild(0, "clear");
			this.updateBet();

			this.b_clear.alpha = 0;
			this.b_deal.alpha = 0;
			this.chips_move.removeAllChildren();
		}.bind(this));

		this.txt_player = new window.createjs.BitmapText("", this.font2);
		this.txt_player.setTransform(this.value_bar_1.x, this.value_bar_1.y);
		this.txt_player.scaleX = this.txt_player.scaleY = 0.7;
		this.txt_player.textAlign = "center";

		this.txt_dealer = new window.createjs.BitmapText("", this.font2);
		this.txt_dealer.setTransform(this.value_bar_2.x, this.value_bar_2.y);
		this.txt_dealer.scaleX = this.txt_dealer.scaleY = 0.7;
		this.txt_dealer.textAlign = "center";

		this.stage.addChild(background, t_player, t_banker, history, this.txt_history, this.highlights, this.selected, this.cards, this.card_back, this.card_pack, this.chips_move, this.chips);
		this.stage.addChild(this.value_bar_1, this.value_bar_2, this.txt_player, betBar, this.txt_bet, this.txt_dealer, this.b_clear, this.bet_bar, this.bet_txts);

		this.valueBar("hide");

		this.game_end = this.stage.addChild(new window.createjs.Container());

		this.getHeader();

		this.buttons = this.stage.addChild(new window.createjs.Container());

		this.b_deal = new window.createjs.Bitmap(this.img("btn_deal"));
		this.b_deal.setTransform(1110, 640);
		this.b_deal.regX = this.b_deal.getBounds().width/2;
		this.b_deal.regY = this.b_deal.getBounds().height/2;
		this.b_deal.alpha = 0;
		this.b_deal.name = "btn_deal";

		this.chips_sheet = new window.createjs.SpriteSheet({
			"images": [this.img("chips")],
			"frames": {"width":64,"height":64,"count":4,"regX":32,"regY":32},
			"animations": {
				"animate": [0,3]
			}
		});

		this.chips_stack_sheet = new window.createjs.SpriteSheet({
			"images": [this.img("chips_stack")],
			"frames": {"width":128,"height":128,"count":4,"regX":64,"regY":64},
			"animations": {
				"animate": [0,3]
			}
		});

		for(let i=4; i>0; i--) {
			let chip = new window.createjs.Sprite(this.chips_stack_sheet);
			chip.x = 0+(128*i);
			chip.y = 640;
			chip.gotoAndStop(i-1);
			this.chips.addChild(chip);
			chip.on("click", this.chipsClick.bind(this));
		}

		this.buttons.addChild(this.b_deal);

		this.buttons.on("click", this.btnClick.bind(this));

		this.setButtonVisible();
	}

	getHeader() {
		let moneyBar = new window.createjs.Bitmap(this.img("moneyBar"));
		moneyBar.setTransform(148, 54);
		moneyBar.regX = moneyBar.getBounds().width/2;
		moneyBar.regY = moneyBar.getBounds().height/2;

		let btnSound = new window.createjs.Bitmap(this.img("btnSound"));
		btnSound.setTransform(1134, 60);
		btnSound.regX = btnSound.getBounds().width/2;
		btnSound.regY = btnSound.getBounds().height/2;
		btnSound.name = "sound";

		let btnMenu = new window.createjs.Bitmap(this.img("btnMenu"));
		btnMenu.setTransform(1052, 60);
		btnMenu.regX = btnMenu.getBounds().width/2;
		btnMenu.regY = btnMenu.getBounds().height/2;
		btnMenu.name = "menu";

		let btnAbout = new window.createjs.Bitmap(this.img("btnAbout"));
		btnAbout.setTransform(1052, 60);
		btnAbout.regX = btnAbout.getBounds().width/2;
		btnAbout.regY = btnAbout.getBounds().height/2;
		btnAbout.name = "about";

		let btnFullscreen = new window.createjs.Bitmap(this.img("btnFullscreen"));
		btnFullscreen.setTransform(1216, 60);
		btnFullscreen.regX = btnFullscreen.getBounds().width/2;
		btnFullscreen.regY = btnFullscreen.getBounds().height/2;
		btnFullscreen.name = "fullscreen";

		this.btn_gui = new window.createjs.Container();
		this.stage.addChild(moneyBar,this.btn_gui);

		if(this.gameState === "game"){
			this.btn_gui.addChild(btnMenu);
		} else {
			this.btn_gui.addChild(btnAbout);
		}

		this.btn_gui.addChild(btnSound,btnFullscreen);
		this.btn_gui.on("click", this.btnTween.bind(this));

		let about_c = this.stage.addChild(new window.createjs.Container());

		//About
		btnAbout.on('click', function(){
			if(this.gameState === 'menu'){
				let popup = new window.createjs.Bitmap(this.img("about_window"));
				popup.setTransform(640, 340);
				popup.regX = popup.getBounds().width/2;
				popup.regY = popup.getBounds().height/2;
				popup.shadow = new window.createjs.Shadow("#000000", -1, 1, 20);

				let content = new window.createjs.Bitmap(this.img("about_content"));
				content.setTransform(640, 340);
				content.regX = content.getBounds().width/2;
				content.regY = content.getBounds().height/2;

				about_c.addChild(popup, content);
				setTimeout(function(){
					this.gameState = 'about';
				}.bind(this), 100)
			}
		}.bind(this))

		about_c.on('click', function(){
			if(this.gameState === 'about'){
				this.gameState = 'menu';
				about_c.removeAllChildren();
			}
		}.bind(this))

		//Fullscreen button || FULL SCREEN FEATURE TO IMPLEMENT THEN
		// btnFullscreen.on("click", function(){
		// 	if(this.is_fullscreen === false){
		// 		screenfull.request();
		// 		this.is_fullscreen = true;
		// 	}
		// 	else {
		// 		screenfull.exit();
		// 		this.is_fullscreen = false;
		// 	}
		// }.bind(this));

		if(this.sound_enable === false){
			btnSound.alpha = 0.4;
		}
		
		this.txt_cash = new window.createjs.BitmapText(this.cur_cash.toString(), this.font2);
		this.txt_cash.setTransform(140, 54);
		this.txt_cash.scaleX = this.txt_cash.scaleY = 0.9;
		this.stage.addChild(this.txt_cash);
		this.getCasinoFunds();
	}

	async getCasinoFunds() {
		const body = {
			address: this.props.currentAccount
		}
		const resp = await getTemporalWalletBalance(body);
		this.updateCash(resp.message.cinBalance);
	}

	updateHistory() {
		for(let i=0; i<10; i++) {
			if (this.history_value[i] >= 0) {
				let child = this.txt_history.getChildAt(i);
				child.text = this.history_value[i].toString();
			}
		}
	}

	valueBar(e) {
		if (e === "hide") {
			this.value_bar_1.alpha = this.value_bar_2.alpha = 0;
			this.txt_dealer.text = this.txt_player.text = "";
		} else {
			this.value_bar_1.alpha = this.value_bar_2.alpha = 1;
		}
	}

	btnClick(e) {
		this.playSound("Click");

		if (this.is_ready && this.cur_player === "player") {
			this.is_ready = false;
			window.createjs.Tween.get(e.target)
				.to({scaleX:0.8, scaleY:0.8}, 100)
				.to({scaleX:1, scaleY:1}, 100)
				.call(function() {
					let name = e.target.name;

					if (name === "btn_deal") {
						if (this.cur_cash > 0) {
							this.play();
						} else {
							if (this.reload_money) {
								this.is_ready = true;
								if (window.confirm("YOU DON'T HAVE ENOUGH MONYE! \n\nPress \"OK\" to get 500 coins!") === true) {
									this.cur_cash = this.reload_money_amount;
									this.txt_cash.text = this.cur_cash.toString();

									if (this.save_money) {
										localStorage.setItem("cash", this.cur_cash);
									}
								}
							} else {
								alert("YOU DON'T HAVE ENOUGH MONEY!");
							}
						}
					}
				}.bind(this));
		}
	}

	selectedOption(e) {
		this.selected_opt = e;
		for(let i=0; i<3; i++){
			let child = this.selected.getChildAt(i);
			let child_hl = this.highlights.getChildAt(i);
			child_hl.alpha = 0.05;
			if(child.name === e){
				child_hl.alpha = 1;
				this.cur_pos[0] = child.x;
				this.cur_pos[1] = child.y;
			}
		}
	}

	flash(e) {
		for(let i=0; i<3; i++) {
			let child = this.highlights.getChildAt(i);
			child.alpha = 0.05;
			if (child.name === e) {
				let count = 0;
				let sw = 0;
				let time = setInterval(hlFlash, 150)

				function hlFlash() {
					count++;
					if (sw === 0) {
						child.alpha = 1;
						sw = 1;
					} else {
						child.alpha = 0.05;
						sw = 0;
					}
					if (count === 14) {
						clearInterval(time);
					}
				}
				break;
			}
		}
	}

	chipsClick(e) {
		let value = e.target.currentFrame;
		console.log(this.bet);

		let result = this.checkBetValue(value);

		if (this.bet + result > 400) {
			toast.warn('Your bet would exceed the maximum betting amount which is 400 $WRLD.');
			return;
		}

		if (this.bet <= this.cur_cash - result && this.chips_ready) {
			this.chips_ready = false;
			this.playSound("chipsHandle");
			window.createjs.Tween.get(e.target)
				.to({scaleX:0.9, scaleY:0.9}, 100)
				.to({scaleX:1, scaleY:1}, 100)
				.call(function() {
					this.setBet(value);
					this.spawnChips(value);
					this.chips_ready = true;
					this.b_deal.alpha = 1;
				}.bind(this));
		} else if (this.bet > this.cur_cash - result && this.cur_cash > 0) {
			toast.warn("Your bet would exceed your CinSity Wallet funds. Go to User Dashboard and fund it with more $WRLD.");
		} else if (this.cur_cash === 0) {
			toast.warn("Your CinSity Wallet hasn't been funded yet. Go to User Dashboard and fund it with some $WRLD.");
		}
	}

	checkBetValue(e) {
		if (e === 0) {
			return 10;
		} else if (e === 1) {
			return 20;
		} else if (e === 2) {
			return 50;
		} else if (e === 3) {
			return 100;
		}
	}

	spawnChips(e) {
		let t_x = this.cur_pos[0];
		let t_y = this.cur_pos[1];
		let randX = Math.round(Math.random() * 40 + (t_x + 20));
		let randY = Math.round(Math.random() * 40 + (t_y - 20));

		let chip = new window.createjs.Sprite(this.chips_sheet);
		chip.gotoAndStop(e);
		chip.tag = this.selected_opt;
		chip.x = 640;
		chip.y = 760;
		this.chips_move.addChild(chip);

		window.createjs.Tween.get(chip)
			.to({x:randX, y:randY}, 300)
			.call(function() {
				this.playSound("chipsCollide");
			}.bind(this));
	}

	setBet(e) {
		let result = 0;
		if (e === 0) {
			result = 10;
		} else if (e === 1) {
			result = 20;
		} else if (e === 2) {
			result = 50;
		} else if (e === 3) {
			result = 100;
		}

		this.bet += result;

		this.updateBet();
		this.updateBetChild(result, "update");

		if(this.b_clear.alpha === 0) {
			this.b_clear.alpha = 1;
		}
	}

	updateBet() {
		this.txt_bet.text = this.bet.toString();
		this.txt_bet.regX = this.txt_bet.getBounds().width/2;
		this.txt_bet.x = 1040 + 22;
	}

	updateBetChild(e, type) {
		if(type === "update"){
			this.bet_bar.alpha = 1;

			for(let i=0; i<3; i++){
				let child = this.bet_txts.getChildAt(i);

				if(child.name === this.selected_opt){
					if(this.bet_value[i] === 0){
						let bet = this.bet_bar.getChildAt(i);
						bet.alpha = 1;
					}
					this.bet_value[i] += e;
					child.text = this.bet_value[i].toString();
					child.regX = child.getBounds().width/2;
				} else {
					if(this.bet_value[i] === 0){
						let bet = this.bet_bar.getChildAt(i);
						bet.alpha = 0;
					}
				}
			}
		} else if(type === "clear"){
			this.bet_value = [0,0,0];
			this.bet_bar.alpha = 0;
			for(let i=0; i<3; i++){
				let child = this.bet_txts.getChildAt(i);
				child.text = "";
			}
		}
	}

	btnTween(e) {
		let child = e.target;
		window.createjs.Tween.get(child)
			.to({scaleX:0.9,scaleY:0.9},100)
			.to({scaleX:1,scaleY:1},100)
			.call(function(){
				this.btnUi(e);
			}.bind(this))
	}

	btnUi(e) {
		let name = e.target.name;
		
		if(name === "menu"){
			//Go to main menu
			this.updateBetChild(0, "clear");
			this.stage.removeAllChildren();
			this.chips_move.removeAllChildren();
			this.cards.removeAllChildren();
			this.card_back.removeAllChildren();
			this.selected.removeAllChildren();
			this.bet_txts.removeAllChildren();
			this.highlights.removeAllChildren();
			this.bet_bar.removeAllChildren();
			this.txt_history.removeAllChildren();
			this.toMenu();
		}
		else if(name === "sound"){
			//Set sound
			if(this.sound_enable === true){
				this.sound_enable = false;
				e.target.alpha = 0.4;
			}
			else {
				this.sound_enable = true;
				e.target.alpha = 1;
			}
		}
	}

	updateCash(cash) {
		let c = parseInt(cash);
		this.cur_cash = c;
		this.txt_cash.text = c.toString();

		if (this.save_money === true) {
			localStorage.setItem("cash", this.cur_cash);
		}
	}

	deal() {
		this.cardReset();
		this.valueBar("show");

		this.b_clear.alpha = 0;
		this.player_value = 0;

		this.hit();

		this.cur_cash -= this.bet;
		this.updateCash();

		this.b_deal.alpha = 0;
		this.chips.alpha = 0;
	}

	async play() {
		this.cardReset();
		this.valueBar("show");

		this.props.setIsLoading(true);
		let authMessage = getAuthMessage(this.props.currentAccount);
		let resp;
		await toast.promise(
			async () => {
				const signedMessage = await getAuthMessageSignature(authMessage, false);
				const body = {
					address: this.props.currentAccount,
					token: authMessage,
					signature: signedMessage,
					tieBetAmount: this.bet_value[1],
					playerBetAmount: this.bet_value[0],
					bankerBetAmount: this.bet_value[2]
				}
				resp = await playBaccarat(body);
			},
			{
				pending: false,
				success: false,
				error: {
					render({data}) {
						return data.message;
					}
				}
			}
		);
		
		console.log(resp);
		this.props.setIsLoading(false);

		const isWinner = resp.message.isWinner;
		const bankerHand = resp.message.bankerHand;
		const playerHand = resp.message.playerHand;
		const payout = resp.message.payout;

		let mergedHands = [];

		for (let i=0; i<3; i++) {
			if (i < playerHand.length) {
				mergedHands.push(playerHand[i]);
			}
			if (i < bankerHand.length) {
				mergedHands.push(bankerHand[i]);
			}
		}

		const mHL = mergedHands.length;

		let hWMC = mHL === 6 || mHL === 4 ? 0 : 
					bankerHand.length > playerHand.length ? 2 : 1;
		
		let counter = 0;
		for (const card of mergedHands) {
			if (counter !== 0) {
				await this.sleep(500);
			}
			if (hWMC === 0 || hWMC === 1) {
				if (counter%2 === 0) {
					this.iAddCard("player", card, counter);
				} else {
					this.iAddCard("dealer", card, counter);
				}
			} else {
				if (counter<=3) {
					if (counter%2 === 0) {
						this.iAddCard("player", card, counter);
					} else {
						this.iAddCard("dealer", card, counter);
					}
				} else {
					this.iAddCard("dealer", card, counter);
				}
			}
			counter++;
		}

		await this.sleep(1000);

		if (payout === 8) {
			for (let i=0; i<3; i++) {
				this.getChips("win", i);
			}
			this.playSound("Tie");
			this.spawnImage("tie");
		} else {
			if (isWinner) {
				for (let i=0; i<3; i++) {
					this.getChips("win", i);
				}
				this.playSound("youwin");
				this.spawnImage("win");
			} else {
				for (let i=0; i<3; i++) {
					this.getChips("lose", i);
				}
				this.playSound("youlose");
				this.spawnImage("lose");
			}
		}

		this.updateCash();
		this.getCasinoFunds();

		this.history_value.unshift(this.player_value, this.dealer_value);
		this.updateHistory();

		await this.sleep(3000);

		this.cardsUp()
	}

	sleep(ms) {
		return new Promise(res => setTimeout(res, ms));
	}

	iAddCard(e, random, hitcount) {
		let cardSpeed = 400;
		let cardType = this.randomCard();

		let posX;
		if (e==="player") {
			this.player_value = this.iSumValue(this.player_value, this.iCheckCardValue(random));
			this.txt_player.text = this.player_value.toString();
			this.txt_player.regX = this.txt_player.getBounds().width/2;
			this.txt_player.x = this.value_bar_1.x + 12;
			posX = 480 + (25 * hitcount);
		} else if (e==="dealer") {
			this.dealer_value = this.iSumValue(this.dealer_value, this.iCheckCardValue(random));
			this.txt_dealer.text = this.dealer_value.toString();
			this.txt_dealer.regX = this.txt_dealer.getBounds().width/2;
			this.txt_dealer.x = this.value_bar_2.x + 12;
			posX = 800 + (25 * hitcount);
		}

		let posY = 220;
		
		let card = new window.createjs.Bitmap(this.img("card"+cardType+random));
		card.setTransform(this.card_pack.x, this.card_pack.y);
		card.regX = card.getBounds().width/2;
		card.regY = card.getBounds().height/2;
		card.name = e;
		card.alpha = 0;
		card.shadow = new window.createjs.Shadow("#000000", -1, 1, 20);

		let cardB = new window.createjs.Bitmap(this.img("card_back_img"));
		cardB.setTransform(card.x, card.y);
		cardB.regX = cardB.getBounds().width/2;
		cardB.regY = cardB.getBounds().height/2;

		this.cards.addChild(card);
		this.card_back.addChild(cardB);

		window.createjs.Tween.get(cardB)
			.to({x:posX, y:posY}, cardSpeed)
			.call(function() {
				this.iSetCardPosition(cardB, card);
				this.playSound("cardPlace");
			}.bind(this));
	}

	iSetCardPosition(cb, cc) {
		let target = cb.x - 25;

		window.createjs.Tween.get(cc)
			.to({x: target}, 100);
		
		window.createjs.Tween.get(cb)
			.to({x: target}, 100)
			.call(
				function() {
					this.flipCard(cb, cc);
				}.bind(this)
			);
	}

	iCheckCardValue(c) {
		return c <= 9 ? c : 0;
	}

	iSumValue(c, sv) {
		let ts = c+sv;
		return ts < 10 ? ts : ts-10;
	}

	hit() {
		let random = this.generateCard("player");
		this.player_value += this.checkCard(random);

		if(this.player_value > 9) {
			this.player_value -= 10;
		}

		this.player_hit_count++;

		if(this.player_hit_count === 2) {
			if (this.player_value === 8 || this.player_value === 9) {
				this.player_natural = true;
			}
		}

		this.addCard("player", random, this.player_hit_count);
	}

	dealerHit() {
		let random = this.generateCard("dealer");
		this.dealer_value += this.checkCard(random);

		if (this.dealer_value > 9) {
			this.dealer_value -= 10;
		}
		
		this.dealer_hit_count++;

		if (this.dealer_hit_count === 2) {
			if (this.dealer_value === 8 || this.dealer_value === 9) {
				this.dealer_natural = true;
			}
		}

		this.addCard("dealer", random, this.dealer_hit_count);
	}

	cardReset() {

		this.cards.removeAllChildren();
		this.card_back.removeAllChildren();
		this.game_end.removeAllChildren();

		this.player_value = 0;
		this.dealer_value = 0;

		this.player_hit_count = 0;
		this.dealer_hit_count = 0;

		this.player_natural = false;
		this.dealer_natural = false;
	}

	generateCard(type) {
		let rand = Math.round(Math.random() * 4);
		let result;

		if (rand === 3) {
			let rand2 = Math.round(Math.random() * 3 + 1);
			if (rand2 === 1) {
				result = "A";
			}
			if (rand2 === 2) {
				result = "J";
			}
			if (rand2 === 3) {
				result = "Q";
			}
			if (rand2 === 4) {
				result = "K";
			}
		} else {
			let value = Math.round(Math.random() * 8 + 2);
			result = value;
		}

		if (type !== "tie" && this.dealer_hit_count >= 1) {
			let plus = this.checkCard(result);

			if (type === "player") {
				if (this.player_value + plus === this.dealer_value) {
					result = this.generateCard("tie");
				}
			} else if (type === "dealer") {
				if (this.player_value === this.dealer_value + plus) {
					result = this.generateCard("tie");
				}
			}
		}

		return result;
	}

	checkCard(e) {
		let tmp;
		
		if (e <= 10) {
			if (e <= 9) {
				tmp = e;
			} else if (e === 10) {
				tmp = 0;
			}
		} else {
			if (e === "J" || e === "Q" || e === "K") {
				tmp = 0;
			} else if (e === "A") {
				if (this.player_hit_count <= 1 || this.dealer_hit_count <= 1) {
					tmp = 1;
				} else {
					tmp = 1;
				}
			}
		}

		return tmp;
	}

	setButtonVisible() {
		this.chips.alpha = 1;

		this.is_ready = true;
		this.cur_player = "player";
		this.b_clear.alpha = 0;

		this.valueBar("hide");
	}

	checkWinner() {
		let result;
		let id;

		if (this.player_value > this.dealer_value) {
			if (this.player_value <= 9) {
				result = "player";
				id = 0;
			}
		} else if (this.player_value === this.dealer_value) {
			result = "tie";
			id = 1;
		} else if (this.player_value < this.dealer_value) {
			if (this.dealer_value <= 9) {
				result = "banker";
				id = 2;
			}
		}

		this.flash(result);

		this.history_value.unshift(this.player_value, this.dealer_value);
		this.updateHistory();

		function isWin() {
			let lose_count = 0;
			let win_count = 0;
			for(let i=0; i<3; i++) {
				if (i === id) {
					if (this.bet_value[i] > 0) {
						win_count++;
						if (result === "tie") {
							this.cur_cash += this.bet_value[i]*8;
						} else {
							this.cur_cash += this.bet_value[i]*2;
						}
						this.getChips("win", i);
					} else {
						lose_count++;
					}
				} else {
					if (this.bet_value[i] > 0) {
						lose_count++;
						if (result === "tie") {
							this.cur_cash += this.bet_value[i];
							this.getChips("win", i);
						} else {
							this.getChips("lose", i);
						}
					}
				}
			}

			if (result === "tie") {
				this.playSound("Tie");
				this.spawnImage("tie");
			} else if (lose_count === 0) {
				this.playSound("youwin");
				this.spawnImage("win");
			} else if (win_count === 0) {
				this.playSound("youlose");
				this.spawnImage("lose");
			}

			this.updateCash();
		}

		setTimeout(isWin.bind(this), 1000);
		setTimeout(this.cardsUp.bind(this), 4000);
	}

	cardsUp() {
		let num = this.cards.children.length;
		let _type = typeof this.game_end.getChildAt(0);

		if (_type === "object") {
			window.createjs.Tween.get(this.game_end.getChildAt(0))
				.to({y: 700}, 300, window.createjs.Ease.sineIn)
				.call(function() {
					this.game_end.removeAllChildren();
				}.bind(this));
		}

		let target_x = this.card_pack.x;
		let target_y = this.card_pack.y;

		for(let i=0; i<num; i++) {
			let child = this.cards.getChildAt(i);

			window.createjs.Tween.get(child)
				.to({x:target_x, y:target_y}, 350)
				.call(function() {
					this.cards.removeAllChildren();

					this.bet = 0;
					this.updateBetChild(0, "clear");
					this.updateBet();

					this.setButtonVisible();
					for (let j=0; j<3; j++) {
						let child2 = this.highlights.getChildAt(j);
						if (child2.name === this.selected_opt) {
							child2.alpha = 1;
						}
					}
				}.bind(this));
		}
	}

	spawnImage(e) {
		let result = new window.createjs.Bitmap(this.img(e));
		result.setTransform(this.canvas.width/2, 700);
		result.regX = result.getBounds().width/2;
		result.regY = result.getBounds().height/2;

		this.game_end.addChild(result);

		window.createjs.Tween.get(result)
			.to({y:360}, 500, window.createjs.Ease.backOut);
	}

	getChips(e, id) {
		let num = this.chips_move.children.length;
		let name = defineId(id);

		function defineId(x) {
			if (x === 0) {
				return "player";
			} else if (x === 1) {
				return "tie";
			} else if (x === 2) {
				return "banker";
			}
		}

		if (e === "win") {
			for(let i=0; i<num; i++) {
				let child = this.chips_move.getChildAt(i);
				if (child.tag === name) {
					window.createjs.Tween.get(child)
						.to({x:640, y:780}, 500)
						.call(function() {
							this.chips_move.removeAllChildren();
						}.bind(this));
				}
			}
		} else if (e === "lose") {
			for(let i=0; i<num; i++) {
				let child = this.chips_move.getChildAt(i);
				if (child.tag === name) {
					window.createjs.Tween.get(child)
						.to({x:640, y:-50}, 500)
						.call(function() {
							this.chips_move.removeAllChildren();
						}.bind(this));
				}
			}
		}
	}

	randomCard() {
		let num = Math.round(Math.random() * 3 + 1);

		if (num === 1) {
			return "-club-";
		} else if (num === 2) {
			return "-diamond-";
		} else if (num === 3) {
			return "-spade-";
		} else if (num === 4) {
			return "-heart-";
		}
	}

	addCard(e, random, hitcount) {
		let cardSpeed = 400;
		let cardType = this.randomCard();
		this.playSound("cardShove");

		let posX;
		if (e === "player") {
			posX = 480 + (25 + hitcount);
		} else if (e === "dealer") {
			posX = 800 + (25 * hitcount);
		}

		let posY = 220;
		this.is_tween = true;

		let card = new window.createjs.Bitmap(this.img("card"+cardType+random));
		card.setTransform(this.card_pack.x, this.card_pack.y);
		card.regX = card.getBounds().width/2;
		card.regY = card.getBounds().height/2;
		card.name = e;
		card.alpha = 0;
		card.shadow = new window.createjs.Shadow("#000000", -1, 1, 20);

		let cardB = new window.createjs.Bitmap(this.img("card_back_img"));
		cardB.setTransform(card.x, card.y);
		cardB.regX = cardB.getBounds().width/2;
		cardB.regY = cardB.getBounds().height/2;

		this.cards.addChild(card);
		this.card_back.addChild(cardB);

		window.createjs.Tween.get(cardB)
			.to({x:posX, y:posY}, cardSpeed)
			.call(function() {
				this.setCardPosition(e);
				this.playSound("cardPlace");
			}.bind(this));
	}

	setCardPositionInnerFunction(e, child, childCard) {
		this.flipCard(child, childCard);
		if (this.triggers.slice(-1)[0]) {
			if (e === "player") {
				this.is_tween = false;
				this.txt_player.text = this.player_value.toString();
				this.txt_player.regX = this.txt_player.getBounds().width/2;
				this.txt_player.x = this.value_bar_1.x + 12;

				if (this.dealer_hit_count < 2) {
					this.dealerHit();
				} else if (this.dealer_hit_count === 2 && this.dealer_value < 6 && this.player_natural === false) {
					this.dealerHit();
				} else if (this.dealer_hit_count === 2 && this.player_hit_count === 2 && this.player_value < 6 && this.dealer_natural === false) {
					this.hit();
				} else {
					this.checkWinner();
				}
			}

			if (e === "dealer") {
				this.txt_dealer.text = this.dealer_value.toString();
				this.txt_dealer.regX = this.txt_dealer.getBounds().width/2;
				this.txt_dealer.x = this.value_bar_2.x + 12;

				if (this.player_hit_count < 2) {
					this.hit();
				} else if (this.player_hit_count === 2 && this.player_value < 6 && this.dealer_natural === false) {
					this.hit();
				} else if (this.player_hit_count === 2 && this.dealer_hit_count === 2 && this.dealer_value < 6 && this.player_natural === false) {
					this.dealerHit();
				} else {
					this.checkWinner();
				}
			}
		}
		this.triggers.pop();
		this.triggers.push(false);
	}

	setCardPosition(e) {
		let num = this.card_back.children.length;
		this.triggers.push(true);

		for(let i=0; i<num; i++) {
			console.log(num);
			if (this.cards.children[i].name === e) {
				console.log(this.cards.children[i].name);
				console.log(e);
				let child = this.card_back.getChildAt(i);
				let childCard = this.cards.getChildAt(i);
				let target = child.x - 25;

				window.createjs.Tween.get(childCard)
					.to({x:target}, 100);

				window.createjs.Tween.get(child)
					.to({x:target}, 100)
					.call(function(){
						this.setCardPositionInnerFunction(e, child, childCard);
					}.bind(this));
			}
		}
	}

	flipCard(e, i) {
		window.createjs.Tween.get(e)
			.to({scaleX:0}, 100)
			.call(function() {
				let child = i;
				child.alpha = 1;

				child.x = e.x;
				child.y = e.y;
				child.scaleX = 0;
				window.createjs.Tween.get(child)
					.to({scaleX:1}, 100);
			});
	}

	resizeGame() {
		let viewport, newGameWidth, newGameHeight;

		viewport = {
			width: document.getElementById("canvas-container").clientWidth,
			height: window.innerHeight
		}

		if (this.canvas.height / this.canvas.width > viewport.height / viewport.width) {
			newGameHeight = viewport.height;
			newGameWidth = newGameHeight * this.canvas.width / this.canvas.height;
		} else {
			newGameWidth = viewport.width;
			newGameHeight = newGameWidth * this.canvas.height / this.canvas.width;
		}

		this.canvas.style.width = newGameWidth + "px";
		this.canvas.style.height = newGameHeight + "px";

	}

	render () {
		return(
			<div id="canvas-container" className="canvas-container">
				<canvas id="canvas" width="1280" height="720"></canvas>
				{this.props.children}
			</div>
		);
	}

	
}

const Baccarat = (props) => {

	const { currentAccount } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<MainLayout>
			<BaccaratCanvas
				currentAccount={currentAccount}
				setIsLoading={setIsLoading}
			>
				<div className={`loading-container ${isLoading ? "visible" : ""}`}>
					<div className="lds-circle"><div></div></div>
				</div>
			</BaccaratCanvas>
		</MainLayout>
	);
}

export default Baccarat;