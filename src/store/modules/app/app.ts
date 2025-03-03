import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { getSidebarStatus, getSize, setLanguage, setSidebarStatus, setSize } from '@/utils/cookies';
import { getLocale } from '@/locales';
import { store } from '@/store';

export enum DeviceType {
    Mobile,
    Desktop,
}

export interface AppState {
    device: DeviceType
    sidebar: {
        opened: boolean
        withoutAnimation: boolean
    }
    language: string
    size: string
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {
    public sidebar = {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false
    };

    public device = DeviceType.Desktop;
    public language = getLocale();
    public size = getSize() || 'medium';

    @Action
    public ToggleSideBar(withoutAnimation: boolean) {
        this.TOGGLE_SIDEBAR(withoutAnimation);
    }

    @Action
    public CloseSideBar(withoutAnimation: boolean) {
        this.CLOSE_SIDEBAR(withoutAnimation);
    }

    @Action
    public ToggleDevice(device: DeviceType) {
        this.TOGGLE_DEVICE(device);
    }

    @Action
    public SetLanguage(language: string) {
        this.SET_LANGUAGE(language);
    }

    @Action
    public SetSize(size: string) {
        this.SET_SIZE(size);
    }

    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = withoutAnimation;
        if (this.sidebar.opened) {
            setSidebarStatus('opened');
        } else {
            setSidebarStatus('closed');
        }
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = false;
        this.sidebar.withoutAnimation = withoutAnimation;
        setSidebarStatus('closed');
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
        this.device = device;
    }

    @Mutation
    private SET_LANGUAGE(language: string) {
        this.language = language;
        setLanguage(this.language);
    }

    @Mutation
    private SET_SIZE(size: string) {
        this.size = size;
        setSize(this.size);
    }
}

export const AppModule = getModule(App);
