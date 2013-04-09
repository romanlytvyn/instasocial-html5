/*
 * File: app/view/NewsFeedvkList.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('InstaSocial.view.NewsFeedvkList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.newsFeedvkList',

    config: {
        cls: 'newsfeed-list',
        id: 'newsFeedvkList',
        showAnimation: 'slide',
        modal: false,
        disableSelection: true,
        store: 'NewsFeedvkStore',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        itemTpl: Ext.create('Ext.XTemplate', 
            '<div class="newsfeed-list-item">',
            '	<div class="header">',
            '        <div class="icon">',
            '            <img src="{User.photo}"/>',
            '    	</div>',
            '        <div class="info">',
            '        	<div class="name">',
            '        		{User.full_name}',
            '    		</div>',
            '            <div class="date">',
            '        		{created_time}',
            '    		</div>',
            '        </div>',
            '    </div>',
            '    <div class="body">',
            '        {text}',
            '    </div>',
            '    <div class="footer">',
            '        {likes_count} Likes {comments_count} Comment(s)',
            '    </div>  ',
            '</div>',
            {
                disableFormats: true
            }
        )
    }

});