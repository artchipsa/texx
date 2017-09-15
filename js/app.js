var doc = $(document);

doc.ready(function(){
	// логика сворачивания меню.
	menuSetData();
	menuResize();
	$(window).resize(function(){
		menuResize();
		menuSetData();
	})
	//sliders
	if ($('.main-slider').length){	
		$('.owl-carousel').each(function(){
			var slider = $(this);
			$(this).on('initialized.owl.carousel', function(e){
				var length;
				var current;
				if (e.item.count < 10){
					length = '0'+e.item.count;
				} else {
					length = e.item.count;
				}
				if (e.item.index+1 < 10){
					current = '0'+parseInt(e.item.index+1);
				} else {
					current = e.item.index+1;
				}
				sliderUpdate($(this), length, current);
			})

			$(this).owlCarousel({
				margin: 0,
				items: 1,
				dots: false
			});

			$(this).on('translated.owl.carousel', function(e){
				var current;
				var length;
				if (e.item.count < 10){
					length = '0'+e.item.count;
				} else {
					length = e.item.count;
				}
				if (e.item.index+1 < 10){
					current = '0'+parseInt(e.item.index+1);
				} else {
					current = e.item.index+1;
				}
				sliderUpdate($(this), length, current);

			});

			$(this).parent().find('.arrow').click(function(){
				if ($(this).hasClass('next')){
					slider.trigger('next.owl.carousel');
				} else {
					slider.trigger('prev.owl.carousel');
				}
				return false;
			});

		});
	}

	if ($('.red-slider').length){

		var adv = $('.red-slider').owlCarousel({
			margin: 0,
			items: 1,
			dots: true,
			nav: false
		});

	}

	if ($('.scroll-control').length){
		var down_int;
		var up_int;

		doc.on('click', '.scroll-down', function(e){
			if ($(this).hasClass('disabled')) return false 
			e.preventDefault();
			var val = 70;
			$('.scrolled-content').mCustomScrollbar("scrollTo", "-="+val, {
				scrollInertia:600
			});
		});
		$('.scroll-down').mousedown(function(){
			if ($(this).hasClass('disabled')) return false
			var val = 70;
			function down(){
				$('.scrolled-content').mCustomScrollbar("scrollTo", "-="+val,{
					scrollInertia:10
				});
			}
			down_int = setInterval(down, 100);
		}).mouseup(function(){
			clearInterval(down_int);
		});

		doc.on('click', '.scroll-up', function(e){
			if ($(this).hasClass('disabled')) return false		
			e.preventDefault();
			var val = 70;
			$('.scrolled-content').mCustomScrollbar("scrollTo", "+="+val,{
				scrollInertia:600
			});
		});
		$('.scroll-up').mousedown(function(){
			if ($(this).hasClass('disabled')) return false			
			var val = 70;
			function up(){
				$('.scrolled-content').mCustomScrollbar("scrollTo", "+="+val,{
					scrollInertia:10
				});
			}
			up_int = setInterval(up, 100);
		}).mouseup(function(){
			clearInterval(up_int);
		});
	}


	if ($('.scrolled-content').length){
		$('.scrolled-content').mCustomScrollbar({
			theme: "dark",
			scrollInertia: 250,
			mouseWheel:{ scrollAmount: 150 },
			callbacks:{
				onTotalScroll: function(){
					$('.scroll-down').addClass('disabled');
					$('.scroll-up').removeClass('disabled');
					if ($('.feedback').length){
						setTimeout(function(){
							$('.main-content, .feedback').addClass('scrolled_down');
						}, 300)
					}
				},
				onTotalScrollBack: function(){
					$('.scroll-up').addClass('disabled');
					$('.scroll-down').removeClass('disabled');
				},
				whileScrolling: function(){
					$('.scroll-up').removeClass('disabled');
					$('.scroll-down').removeClass('disabled');
					if ($('.feedback').length){
						if (this.mcs.topPct < 81){
							$('.main-content, .feedback').removeClass('scrolled_down');
						}
					}
					if ($('.anchors').length) {
						var top_edge = $('.scrolled-content').offset().top;
						var bottom_edge = $('.scrolled-content').offset().top + 155;
						$('.scrolled-content section').each(function(){
							var offset = $(this).offset().top;
							console.log("offset", offset);
							var id = $(this).attr('id');
							if (offset >= top_edge & offset <= bottom_edge) {
								$('.anchors li').removeClass('active');
                        		$('a[href$='+id+']').parent().addClass('active');
							}
						});
					}
				}
			}
		})
	}


	$('.anchors a').click(function(e){
		e.preventDefault();
        let id = $(this).attr('href');
        $('.scrolled-content').mCustomScrollbar("scrollTo", id,{
			scrollInertia:600
		});
	});


	// main логика листания главной страницы нажатик на кнопку. 
	doc.on('click', '.next-main-link', function(e){
		e.preventDefault();
		var translate = $('.main-container').css('transform').split(/[()]/)[1];
		var posy = translate.split(',')[5];
		var main = $('.main-content');
		var _this = $(this);
		if (_this.index($('.next-main-link')) == 0){
			main.addClass('active');
			posy = -(parseInt(posy) + parseInt($(_this).parents('section').height()));
			setTimeout(function(){
				$('.main-container').css('transform',  "translateY(" +posy+ "px)")
			}, 250);
			_this.removeClass('active')
			_this.parents('section').next('section').find('.next-main-link').addClass('active');
		} else if ($('.next-main-link').index(_this)+1 == $('.next-main-link').length){
			posy = 0;
			$('.main-container').css('transform',  "translateY(" + posy+ "px)")
			setTimeout(function(){
				main.removeClass('active');
			}, 250);
			_this.removeClass('active')
			$('.main-container section').first().find('.next-main-link').addClass('active');
		} else {
			posy = (parseInt(posy) - parseInt($(_this).parents('section').height()));
			$('.main-container').css('transform',  "translateY(" + posy+ "px)")
			_this.removeClass('active');
			_this.parents('section').next('section').find('.next-main-link').addClass('active');
		}
	});

	$('.custom_select').select2({
		dropdownAutoWidth : true,
    	width: 'auto'
	});


	if ($('.calc-sliders').length){

		var amount, run, cost, drain,
			economy = 0.1,
			fuelEconomy = 0.3,
			fuelRate,
			allFuel,
			chart,
			options;

		// константы

		var terminal_cost = 3000,
			terminal_install = 1500,
			DUT_cost = 2100,
			DUT_install = 1750,
			calibration_cost = 250,
			ab_cost = 500;


		options = {
			chart: {
				renderTo: 'chart',
				type: 'line',
				backgroundColor: '#F8F8F8'
			},
			title: {
				text: ""
			},
			yAxis: {
				title: {
					text: 'Деньги'
				}
			},
			xAxis: {
				title:{
					text: 'Время'
				},
				tickInterval: 1
			},
			plotOptions: {
		        series: {
		            pointStart: 1
		        }
		    },
			series: [{
				name: 'Вложения',
				data: [],
				color: '#47A8FF'
			}, {
				name: 'Экономия',
				data: [],
				color: '#E5002E'
			}]
		}


		$('#amount').ionRangeSlider({
			type: 'single',
			min: 1,
			max: 1000,
			step: 1,
			hide_min_max: true,
		    hide_from_to: true,
		    grid: false,
			onStart: function(data) {
				$('#amount').parents('.calc-row').find('.value').text(data.from_pretty + ' ед.');
				amount = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();
			},
			onChange: function(data){
				// $('.scrolled-content').mCustomScrollbar('disable');
				$('#amount').parents('.calc-row').find('.value').text(data.from_pretty + ' ед.');
				amount = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();
			},
			onFinish: function(data){
				setTimeout(function(){
					$('.scrolled-content').mCustomScrollbar('update');
				}, 500)
			}
		})

		$('#run').ionRangeSlider({
			type: 'single',
			min: 1000,
			max: 100000,
			step: 1000,
			hide_min_max: true,
		    hide_from_to: true,
		    grid: false,
			onStart: function(data) {
				$('#run').parents('.calc-row').find('.value').text(data.from_pretty + ' км.');
				run = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();

			},
			onChange: function(data){
				$('#run').parents('.calc-row').find('.value').text(data.from_pretty + ' км.');
				run = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();

			}
		})

		$('#cost').ionRangeSlider({
			type: 'single',
			min: 10,
			max: 50,
			step: 0.1,
			hide_min_max: true,
		    hide_from_to: true,
		    grid: false,
			onStart: function(data) {
				$('#cost').parents('.calc-row').find('.value').text(data.from_pretty + ' руб/л.');
				cost = parseInt(data.from);
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();

			},
			onChange: function(data){
				$('#cost').parents('.calc-row').find('.value').text(data.from_pretty + ' руб/л.');
				cost = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();

			}
		})

		$('#drain').ionRangeSlider({
			type: 'single',
			min: 5,
			max: 50,
			step: 1,
			hide_min_max: true,
		    hide_from_to: true,
		    grid: false,
			onStart: function(data) {
				$('#drain').parents('.calc-row').find('.value').text(data.from_pretty + ' л.');
				drain = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();

			},
			onChange: function(data){
				$('#drain').parents('.calc-row').find('.value').text(data.from_pretty + ' л.');
				drain = data.from;
				fuelRate = calcFuilRate(run, cost, drain);
				allFuel = calcAllFuel(fuelRate, amount);
				calceconomy();
			}
		})
	
		function calcFuilRate(run, cost, drain){
			return (run * cost * drain * 25)/100;
		}

		function calcAllFuel(FuelRate, amount){
			return (FuelRate*amount);
		}

		function calceconomy(){
			var run = fuelRate * economy;
			var sell = fuelRate * fuelEconomy;
			var perOne = run + sell;
			var all = amount*perOne;
			var once_budget = ((terminal_cost+terminal_install)*amount)+((DUT_cost+DUT_install+calibration_cost)*amount);
			var month = ab_cost*amount;
			var payback = 0;

			var iter_all = 0;
			var iter_once = once_budget;
			while (iter_all < iter_once){
				iter_all += month;
				iter_all += all;
				payback += 1;
			}

			var month_total = payback*2;
			var chart_budget = once_budget;
			var chart_economy = 0;

			options.series[0].data.length = 0;
			options.series[1].data.length = 0;

			for(var i = 0; i < month_total; i++){
				options.series[0].data.push(chart_budget);
				options.series[1].data.push(chart_economy);
				chart_budget += month;
				chart_economy += all;
			}

			chart = new Highcharts.chart(options);

			$('#run_economy').text(addCommas(run)+" руб./мес.");
			$('#sell_economy').text(addCommas(sell)+" руб./мес.");
			$('#opti_economy').text(addCommas(perOne)+" руб./мес.");
			$('#all_economy').text(addCommas(all)+" руб./мес.");
			$('#once_budget').text(addCommas(once_budget) + " руб.");
			$('#every_month_budget').text(addCommas(month) + " руб./мес.");
			$('#payback').text(addCommas(payback) + " мес.");

		}
	}


	if ($('.partner-map').length){
		if ($(window).width() > 1025){
			partner_map_size();
			$(window).resize(function(){
				partner_map_size();
			});
		}

		var areas = [
			{countryId: "RU-AD", text: "Адыгейская область"},
			{countryId: "RU-ALT", text: "Алтайский край"},
			{countryId: "RU-AMU", text: "Амурская область"},
			{countryId: "RU-BRY", text: "Брянск"},
			{countryId: "RU-CHE", text: "Челябинск"},
			{countryId: "RU-CHU", text: "Чукотка"},
			{countryId: "RU-KC", text: "Карачаево-Черкесия"},
			{countryId: "RU-KDA", text: "Краснодар"},
			{countryId: "RU-KEM", text: "Кемерово"},
			{countryId: "RU-KLU", text: "Калуга"},
			{countryId: "RU-KHA", text: "Хабаровкс"},
			{countryId: "RU-KL", text: "Калмыкия"},
			{countryId: "RU-KRS", text: "Курск"},
			{countryId: "RU-MOW", text: "Москва"},
			{countryId: "RU-MOS", text: "Москва"},
			{countryId: "RU-NGR", text: "Брянск"},
			{countryId: "RU-PNZ", text: "Пенза"},
			{countryId: "RU-ROS", text: "Ростов"},
			{countryId: "RU-RYA", text: "Рязань"},
			{countryId: "RU-SAM", text: "Самара"},
			{countryId: "RU-SMO", text: "Смоленск"},
			{countryId: "RU-SPE", text: "Санкт-Петербург"},
			{countryId: "RU-SAR", text: "Саратов"},
			{countryId: "RU-STA", text: "Ставрополь"},
			{countryId: "RU-TVE", text: "Тверь"},
			{countryId: "RU-TYU", text: "Тюмень"},
			{countryId: "RU-UD", text: "Удмуртия"},
			{countryId: "RU-ULY", text: "Ульяновск"},
			{countryId: "RU-VGG", text: "Волгоград"},
			{countryId: "RU-VLA", text: "Владимир"},
			{countryId: "RU-VOR", text: "Воронеж"},
			{countryId: "RU-YAR", text: "Ярославль"},
			{countryId: "RU-ZAB", text: "Забайкалье"},
			{countryId: "RU-SVE", text: "Свердловский"},
			{countryId: "RU-TAM", text: "Тамбов"},
			{countryId: "RU-PER", text: "Перьм"},
			{countryId: "RU-PRI", text: "Приморье"},
			{countryId: "RU-BA", text: "Башкортостан"},
			{countryId: "RU-BEL", text: "Белгород"},
			{countryId: "RU-TA", text: "Татарстан"},
			{countryId: "RU-DA", text: "Дагестан"},
			{countryId: "RU-MAG", text: "Магадан"},
			{countryId: "RU-NIZ", text: "Нижегородская область"},
			{countryId: "RU-ORE", text: "Оренбург"},
			{countryId: "RU-KOS", text: "Кострома"},
			{countryId: "RU-KU", text: "Курганская область"},
			{countryId: "RU-KIR", text: "Кировская область"},
			{countryId: "RU-LIP", text: "Липетск"},
			{countryId: "RU-TY", text: "Тыва"},
			{countryId: "RU-CU", text: "чувашия"},
			{countryId: "RU-AL", text: "Горный алтай"},
			{countryId: "RU-IN", text: "Ингушетия"},
			{countryId: "RU-OMS", text: "Омск"},
			{countryId: "RU-PSK", text: "Псков"},
			{countryId: "RU-NVS", text: "Новосибирск"},
			{countryId: "RU-ORL", text: "Орел"},
			{countryId: "RU-TOM", text: "Томск"},
			{countryId: "RU-TUL", text: "Тула"},
			{countryId: "RU-KHM", text: "Ханты-матсийск"},
			{countryId: "RU-KO", text: "Республика Коми"},
			{countryId: "RU-KAM", text: "Камчатка"},
			{countryId: "RU-KR", text: "Республика Карелия"},
			{countryId: "RU-KK", text: "Хакасия"},
			{countryId: "RU-MUR", text: "Мурманск"},
			{countryId: "RU-MO", text: "Мордовия"},
			{countryId: "RU-ARK", text: "Архангельск"},
			{countryId: "RU-AST", text: "Астрахань"},
			{countryId: "RU-NEN", text: "Ненетский автономный округ"},
			{countryId: "RU-SE", text: "Северная осетия"},
			{countryId: "RU-SA", text: "Якутия"},
			{countryId: "RU-SAK", text: "Сахалин"},
			{countryId: "RU-KYA", text: "Красноярский край"},
			{countryId: "RU-YAN", text: "Ямало-Ненецкий автономный округ"},
			{countryId: "RU-VLG", text: "Вологда"},
			{countryId: "RU-LEN", text: "Ленинград"},
			{countryId: "RU-IRK", text: "Иркутск"},
			{countryId: "RU-IVA", text: "Иваново"},
			{countryId: "RU-BU", text: "Бурятия"},
			{countryId: "RU-CE", text: "Чечня"}
		]

		$('.map_g path').click(function(){

			var id = $(this).attr('countryId');
			var area;
			for (var i = 0; i < areas.length; i++){
				if (areas[i].countryId === id){
					area = areas[i].text;
					$('.area').text(area);
					$('input[name="area"]').val(id);
				}
			}

			$('.modal-container').fadeIn(300);

		});

	}

	if ($('.scrolled-list').length){
		$('.scrolled-list').mCustomScrollbar({
			theme: "dark",
			axis: 'y',
			scrollInertia: 250,
			documentTouchScroll: false,
			mouseWheel:{ scrollAmount: 150 }
		})

		if ($('.scrolled-content').hasClass('mCS_no_scrollbar')){
			$('.scroll-control').hide();
		}
	}

	$('form').on('submit', function(e){
		e.preventDefault();
		var form = $(this);
		var error = checkFields(form);
		if (error){
			console.log('antihype!');
		} else {
			console.log('eee boi');
		}
	});

	doc.on('keyup', '.required', function(){
		$(this).removeClass('error');
	});


	$('.solution-block .item').mouseenter(function(){
		var img = $(this).data('img');

		setTimeout(function(){
			$('.abs-img').css('backgroundImage', img);
			$('.abs-img').fadeIn(300);
		}, 550);

	}).mouseleave(function(){
		$('.abs-img').fadeOut(350, function(){
			$('.abs-img').css('backgroundImage', 'none');
		});
	})

	$('.close-modal').click(function(){
		$('.modal-container').fadeOut(300);
	});

	doc.on('keyup', function(e){
		if (e.keyCode == 27){
			$('.modal-container').fadeOut(300);
		}
	})

	doc.on('click', '.modal-handler', function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		$(id).fadeIn(300);
		if ($(this).attr('data-allcost')){
			console.log($(this).data('amount'));
			$('#amount').val($(this).data('amount'));
			$('#mountcost').val($(this).data('mountcost'));
			$('#selfcost').val($(this).data('selfcost'));
			$('#allcost').val($(this).data('allcost'));
		}
	});

	doc.on('click', '.faq-head', function(e){
		e.preventDefault();
		$(this).find('.faq-circle').toggleClass('active')
		$(this).next().slideToggle();
	});




	// cost


	var light_cost = {
		selfcost: 0,
		mountcost: 0,
		allcost: 0,
		amount: 1,
		selfcost_calc: function(number){
			this.selfcost += number;
		},
		mountcost_calc: function(number){
			this.mountcost += number;
		},
		allcost_calc: function(){
			this.allcost = (this.selfcost + this.mountcost) * this.amount;
		},
		amount_calc: function(amount){
			this.selfcost *= amount;
			this.mountcost *= amount;
		}
	}

	var heavy_cost = {
		selfcost: 0,
		mountcost: 0,
		allcost: 0,
		amount: 1,
		selfcost_calc: function(number){
			this.selfcost += number;
		},
		mountcost_calc: function(number){
			this.mountcost += number;
		},
		allcost_calc: function(){
			this.allcost = (this.selfcost + this.mountcost) * this.amount;
		},
		amount_calc: function(amount){
			this.selfcost *= amount;
			this.mountcost *= amount;
		}
	}

	$('.switcher-tabs a').click(function(e){
		if (!$(this).parent().hasClass('active')){
			$('.switcher').toggleClass('right');
			if ($(window).width() < 560){
				mobileScroll();
			}
		}
	});

	doc.on('click', '.point:visible', function(){
		var id = $(this).attr('id');
		var selfcost = $(this).data('selfcost');
		var mountcost = $(this).data('mountcost');
		if ($('#light').is(':visible')){
			if ($(this).hasClass('active')){
				selfcost = selfcost * (-1);
				mountcost = mountcost * (-1);
				light_cost.selfcost_calc(selfcost);
				light_cost.mountcost_calc(mountcost);
				light_cost.allcost_calc();
				$(this).removeClass('active');
				$('a[data-id='+id+']').removeClass('active');
				lightShowCost();
			} else {
				light_cost.selfcost_calc(selfcost);
				light_cost.mountcost_calc(mountcost);
				light_cost.allcost_calc();
				$(this).addClass('active');
				$('a[data-id='+id+']').addClass('active');
				lightShowCost();
			}
		} else {
			if ($(this).hasClass('active')){
				selfcost = selfcost * (-1);
				mountcost = mountcost * (-1);
				heavy_cost.selfcost_calc(selfcost);
				heavy_cost.mountcost_calc(mountcost);
				heavy_cost.allcost_calc();
				$(this).removeClass('active');
				$('a[data-id='+id+']').removeClass('active');
				heavyShowCost();
			} else {
				heavy_cost.selfcost_calc(selfcost);
				heavy_cost.mountcost_calc(mountcost);
				heavy_cost.allcost_calc();
				$(this).addClass('active');
				$('a[data-id='+id+']').addClass('active');
				heavyShowCost();
			}
		}
	});

	doc.on('click', '.piece:visible', function(e){
		e.preventDefault();
		var id = $(this).data('id');
		var selfcost = $('#'+id).data('selfcost');
		var mountcost = $('#'+id).data('mountcost');
		if ($('#light').is(':visible')){
			if ($(this).hasClass('active')){
				selfcost = selfcost * (-1);
				mountcost = mountcost * (-1);
				light_cost.selfcost_calc(selfcost)
				light_cost.mountcost_calc(mountcost)
				light_cost.allcost_calc()
				$(this).removeClass('active');
				$('#'+id).removeClass('active');
				lightShowCost();
			} else {
				light_cost.selfcost_calc(selfcost)
				light_cost.mountcost_calc(mountcost)
				light_cost.allcost_calc()
				$(this).addClass('active');
				$('#'+id).addClass('active');
				lightShowCost();
			}
		} else {
			if ($(this).hasClass('active')){
				selfcost = selfcost * (-1);
				mountcost = mountcost * (-1);
				heavy_cost.selfcost_calc(selfcost)
				heavy_cost.mountcost_calc(mountcost)
				heavy_cost.allcost_calc()
				$(this).removeClass('active');
				$('#'+id).removeClass('active');
				heavyShowCost();
			} else {
				heavy_cost.selfcost_calc(selfcost)
				heavy_cost.mountcost_calc(mountcost)
				heavy_cost.allcost_calc()
				$(this).addClass('active');
				$('#'+id).addClass('active');
				heavyShowCost();
			}
		}
	})


	doc.on('click', '.amount-control:visible', function(){
		var amount = parseInt($('.amount:visible').text());
		if ($('#light').is(':visible')){
			if ($(this).hasClass('minus')){
				if (amount == 1){
					return false
				} else {
					amount -= 1;
					light_cost.amount = amount
				}
				light_cost.allcost_calc()
				$('.amount:visible').text(amount);
				lightShowCost();
			} else {
				amount += 1;
				light_cost.amount = amount
				light_cost.allcost_calc()
				$('.amount:visible').text(amount);
				lightShowCost();
			}
		} else {
			if ($(this).hasClass('minus')){
				if (amount == 1){
					return false
				} else {
					amount -= 1;
					heavy_cost.amount = amount
				}
				heavy_cost.allcost_calc()
				$('.amount:visible').text(amount);
				heavyShowCost();
			} else {
				amount += 1;
				heavy_cost.amount = amount
				heavy_cost.allcost_calc()
				$('.amount:visible').text(amount);
				heavyShowCost();
			}
		}
	});


	function lightShowCost(){
		$('.self:visible').text(addCommas(light_cost.selfcost+' .-'));
		$('.mount:visible').text(addCommas(light_cost.mountcost+' .-'));
		$('.allcost:visible').text(addCommas(light_cost.allcost+' .-'));
		$('.modal-handler:visible').data('amount', light_cost.amount);
		$('.modal-handler:visible').data('selfcost', light_cost.selfcost);
		$('.modal-handler:visible').data('mountcost', light_cost.mountcost);
		$('.modal-handler:visible').data('allcost', light_cost.allcost);

	}

	function heavyShowCost(){
		$('.self:visible').text(addCommas(heavy_cost.selfcost+' .-'));
		$('.mount:visible').text(addCommas(heavy_cost.mountcost+' .-'));
		$('.allcost:visible').text(addCommas(heavy_cost.allcost+' .-'));
		$('.modal-handler:visible').data('amount', heavy_cost.amount);
		$('.modal-handler:visible').data('selfcost', heavy_cost.selfcost);
		$('.modal-handler:visible').data('mountcost', heavy_cost.mountcost);
		$('.modal-handler:visible').data('allcost', heavy_cost.allcost);
	}



	$('.left-menu .icon').click(function(){
		$('.left-menu').toggleClass('open');
	});

	$('.left-menu a').click(function(){
		$('.left-menu').toggleClass('open');
	})

	$('.more').click(function(){
		$('.more .dropdown').fadeToggle(300);
	})

	if ($('.mobile-scroll-container').length && $(window).width() < 724){
		// setTimeout(function(){
		// 	mobileScroll();
		// }, 550);
		mobileScroll();
		$(window).resize(function(){
			mobileScroll();
		});
	} 

	// $(window).resize(function(){
	// 	if ($('.car-block').length && $(window).width() < 1650){
	// 		mobileScroll();
	// 	} else {
	// 		$('.mobile-scroll').each(function(){
	// 			$(this).css({
	// 				width: 'auto',
	// 				transform: 'translateX(0px)'
	// 			});
	// 		})
	// 	}
	// })

});

var lastAnimation = 0;

function mobileScroll(){
	var container = $('.mobile-scroll');
	container.each(function(){
		var elems = $(this).find('.mobile-scroll-elem');
		var width = 0;
		var stop_parametre = 0;
		elems.each(function(){
			width = width + $(this).outerWidth(true)+10;
			stop_parametre = stop_parametre + ($(this).outerWidth(true)+10);
		});

		$(this).width(width);
		var move;
		var stop = stop_parametre - $(this).parent().width();
		var move_start;

		if ($(this).width() > $(window).width()){

			$(this).hammer().bind('panstart', function(e){
				var matrix = $(this).css('transform');
				matrix = matrix.split('(')[1];
				matrix = matrix.split(')')[0];
				matrix = matrix.split(',');
				matrix = matrix[4];
				move_start = parseInt(matrix, 10);
				move_start = Math.abs(move_start);
			});

			$(this).hammer().bind("pan", function(ev){
				var move_count = ev.gesture.deltaX * (-1);
				move = move_start + move_count;
				if (move >= stop){
					$(this).css({transform: 'translateX(-'+stop+'px)'});
				} else {
					$(this).css({transform: 'translateX(-'+move+'px)'});
				}
			});
		}

	});
}

function checkFields(form){
	var error = false;
	form.find('.required').each(function(){
		if ($(this).val() == ''){
			$(this).addClass('error');
			error = true;
		}
	})

	return error;
}

function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

function partner_map_size(){
	var svg_width = $('.partner-map svg').width();
	var g_width = $('g.map_g').get(0).getBBox().width;
	var scale = (svg_width/g_width) - 0.05;
	$('.map_g').attr('transform', 'scale('+scale+')');
}

// Логика листания на колесико мышки
$(document).bind('mousewheel DOMMouseScroll', function(event) {
	let delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
	event.preventDefault();
	if ($('#mainpage').length){
		init_scroll(event, delta);
	}
});
function init_scroll(event, delta) {
	let deltaOfInterest = delta,
		timeNow = new Date().getTime(),
		quietPeriod = 250;

	if(timeNow - lastAnimation < quietPeriod + 1000) {
		event.preventDefault();
	    return;
	}
   setTimeout(function(){
		if (deltaOfInterest < 0) {
			// если вниз просто нажимаем на кнопочку
			$('.next-main-link.active').click();
	   	} else {
	   		// а вот в верх придется немного изъебнуться. 
	   		mainScrollUp();
	   	}
   }, 150)
	lastAnimation = timeNow;
}


function mainScrollUp(){
	var translate = $('.main-container').css('transform').split(/[()]/)[1];
	var posy = translate.split(',')[5];
	var main = $('.main-content');
	var prev_link = $('.next-main-link.active').parents('section').prev('section').find('.next-main-link');
	if (prev_link.index($('.next-main-link')) == 0){
   		posy = parseInt(posy) + parseInt($('.next-main-link.active').parents('section').prev('section').height());
		$('.main-container').css('transform',  "translateY(" +posy+ "px)");
		setTimeout(function(){
			main.removeClass('active');
		}, 250);
   		$('.next-main-link.active').removeClass('active')
   		prev_link.addClass('active')
	} else {
   		posy = parseInt(posy) + parseInt($('.next-main-link.active').parents('section').prev('section').height());
		$('.main-container').css('transform',  "translateY(" +posy+ "px)");
   		$('.next-main-link.active').removeClass('active')
   		prev_link.addClass('active')
	}
}

function sliderUpdate(slider, length, current){
	slider.parent().find('.slider-current').text(current);
	slider.parent().find('.slider-length').text(length);
}

function menuSetData(){
	$('.nav-item').each(function(){
		$(this).attr('data-width', $(this).outerWidth(true));
	})
}

function menuResize(){
	var container = $('.resize-list-block');
	var width = 0; 
	container.find('.nav-item').each(function(){
		width += $(this).data('width');
		var clone = $(this).clone();
		if (width + container.find('.more').width() > container.width()){
			if (container.find('.dropdown').length <= 0){
				$('<ul class="dropdown"></ul>').appendTo($('.navbar-nav .more'));
			}
			$(this).hide();
			clone.appendTo($('.navbar-nav .dropdown'));
		} else {
			if (container.find('.dropdown')){
				$(this).show();
				container.find('.dropdown').remove();
			}
		}
	});

}