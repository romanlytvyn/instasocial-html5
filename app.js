/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({
    paths: {
        'Ext.ux': 'app/plugins/ux'
    }
});

Ext.application({
    models: [
        'NetworkModel',
        'UserSettingModel',
        'Comment',
        'User',
        'Post',
        'Photo',
        'Attachment',
        'Data',
        'ParentUser',
        'Link',
        'Audio',
        'Video'
    ],
    stores: [
        'NetworksStore',
        'UserSettingsStore',
        'UserSettingsLocalStore',
        'NewsFeedvkStore',
        'NewsFeedfbStore',
        'DataLocalStore'
    ],
    views: [
        'NetworkListContainer',
        'NetworkList',
        'NetworkPanel',
        'MainView',
        'NewsFeedContainer',
        'NewsFeedvkList',
        'NewsFeedfbList',
        'NewsFeedNavigationBarHeader',
        'NewsFeedToolbar',
        'NewsFeedCarousel',
        'PostPanel'
    ],
    controllers: [
        'NetworksController',
        'MainController',
        'NewsFeedController'
    ],
    name: 'InstaSocial',

    launch: function() {
        console.info('Application.launch');
        var mainView = Ext.create('InstaSocial.view.MainView', {fullscreen: true});

        core.settings.loadUserSettings(true);

        if(!core.connectivity.loadNetworks()){
            mainView.list.select(2);
        }

        this.getApplication().getController(config.controllers.networksController).setupNewsFeed();
    }

});
