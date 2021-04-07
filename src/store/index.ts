import { createLogger, createStore } from 'vuex';
// import createPersistedState from 'vuex-persistedstate'
import { AppState, AppStore, store as app } from '@/store/modules/app';
import { SettingsState, SettingStore, store as settings } from '@/store/modules/settings';
import { PermissionState, PermissionStore, store as permission } from '@/store/modules/permission';
import { store as user, UserState, UserStore } from '@/store/modules/user';
import { store as tagViews, TagsStore, TagsViewState } from '@/store/modules/tagsview';

export interface RootState {
    app: AppState
    settings: SettingsState
    permission: PermissionState
    user: UserState
    tagViews: TagsViewState
}

export type Store = AppStore<Pick<RootState, 'app'>> & SettingStore<Pick<RootState, 'settings'>>
    & PermissionStore<Pick<RootState, 'permission'>> & UserStore<Pick<RootState, 'user'>>
    & TagsStore<Pick<RootState, 'tagViews'>>

// Plug in logger when in development environment
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];
// Plug in session storage based persistence
// plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
    plugins,
    modules: {
        app,
        settings,
        permission,
        user,
        tagViews
    }
});

export function useStore(): Store {
    return store as Store;
}
