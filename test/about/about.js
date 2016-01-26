var env = require('../../environment.js');

describe('Go About Page',function(){
	var aboutPageBtn = element(by.css('[href="/about"]'));
	var aboutPage = element(by.css('[class="md-headline ng-binding"]'));

	function wait(s){
		browser.sleep(1000*s);
	}

	function goToAboutPage(){
		aboutPageBtn.click();
	}

	beforeEach(function(){
		browser.get(env.web);
	});

	it('go about page',function(){
		wait(2);
		goToAboutPage();
	});
	
	it('check about page',function(){
		goToAboutPage();
		aboutPage.getText().then(function(result){
			expect(result).toBe('About page.');
		});
	});
});