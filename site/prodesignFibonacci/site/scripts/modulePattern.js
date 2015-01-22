// Use: module.mine.ModuleMethod();
// You may Override: module.mine.ModuleMethod = function(){var h = 'over-write'; return h;}
// Note we have preserved state: use: module.mine.oldModule
// tight augmentation
// capture ModuleMethod state
// capturing ModuleMethod state during initialization allows access to previous state
// in essence allows for non-destructive overrides, over-rights
var module = (function(my){
	my = {};
	
	// override
	my.ModuleMethod = function(parm){
		return 'ModuleMethod before override';
	};
	// preserve previous state so that we can safely override
	my.oldModule = my.ModuleMethod || 'not overridden';
	return{ // must return any private methods we want to expose publicly
		mine:my
	}; 
})(module);