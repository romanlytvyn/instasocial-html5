/*
 * File: app/controller/NewsFeedController.js
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

Ext.define('InstaSocial.controller.NewsFeedController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.newsFeedController',

    config: {
        activeId: '',

        refs: {
            newsFeedCarousel: '#newsFeedCarousel',
            newsFeedNavigationBar: '#newsFeedNavigationBar',
            newsFeedToolbar: '#newsFeedToolbar'
        },

        control: {
            "#newsFeedCarousel": {
                activeitemchange: 'onNewsFeedCarouselActiveItemChange'
            },
            "#btNewsFeedRefresh": {
                tap: 'onBtNewsFeedRefreshTap'
            },
            "#btNewsFeedPost": {
                tap: 'onBtNewsFeedPostTap'
            },
            "#btSendPost": {
                tap: 'onBtSendPostButtonTap'
            },
            "button": {
                tap: 'onBtNewsFeedToggleTap'
            }
        }
    },

    onNewsFeedCarouselActiveItemChange: function(container, value, oldValue, eOpts) {
        this.config.activeId = value.id;

        var title = '';
        var id = this.getActiveNetworkId();
        title += labels.networks[id];
        title += ' - ' + labels.lblNewsFeed;

        Ext.getCmp(config.views.newsFeedNavigationBar).setTitle(title);

        var newsFeedToggle = Ext.getCmp('newsFeedToggle');
        var newsFeedToggleButton = Ext.getCmp('btNewsFeedToggle' + id);
        newsFeedToggle.setPressedButtons([newsFeedToggleButton]);

        if(!core.newsfeed.networks[id].localDataLoaded){
            core.helper.callAsync(core.newsfeed.networks[id].loadData);
        }
    },

    onBtNewsFeedRefreshTap: function(target) {
        this.newsFeedRefresh();
    },

    onBtNewsFeedPostTap: function(target) {
        var postPanel = Ext.Viewport.down(config.views.postPanel);

        if(!postPanel){
            postPanel = Ext.widget(config.views.postPanel);
        } 

        postPanel.showBy(target);


    },

    onBtSendPostButtonTap: function(target) {
        var id = this.getActiveNetworkId();
        var message = Ext.getCmp('taInputPostMessage').getValue();

        var obj = {'text':message};

        core.post.networks[id].postToWall(obj, null, this.newsFeedRefresh);

        this.clearPostPanel();
        Ext.getCmp(config.views.postPanel).hide();


    },

    onBtNewsFeedToggleTap: function(button, e, eOpts) {
        var btId = 'btNewsFeedToggle';

        if(button.id.slice(0, btId.length) == btId){
            var id = button.id.slice(btId.length, btId.length + 2);
            this.setActiveNetwork(id);
        }
    },

    getActiveNetworkId: function() {
        var actId = 'newsFeed';

        return this.config.activeId.slice(actId.length, actId.length + 2);
    },

    clearPostPanel: function() {
        var taInputPostMessage = Ext.getCmp('taInputPostMessage');
        taInputPostMessage.setValue('');
    },

    newsFeedRefresh: function() {
        var id = InstaSocial.app.getController(config.controllers.newsFeedController).getActiveNetworkId();
        core.newsfeed.networks[id].getNewsFeed(null, null, null);

        if(core.connectivity.networks.fb.refreshData){
            Ext.getCmp(config.views.newsFeedfbList).getScrollable().getScroller().scrollTo(0,0,true);
        }
    },

    setActiveNetwork: function(id) {
        var newsFeedCarousel = Ext.getCmp(config.views.newsFeedCarousel);
        var itemId = 'newsFeed' + id + 'List';

        newsFeedCarousel.setActiveItem(itemId);
    }

});