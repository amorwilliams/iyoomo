window.Todos = Ember.Application.create({
	rootElement: '#todoapp'
});

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();