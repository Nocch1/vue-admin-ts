import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex';

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store';
import type { TagsViewState } from './state';
import { state } from './state';
import { mutations, Mutations } from './mutations';
import { actions, Actions } from './actions';

export { TagsViewState };

export type TagsStore<S = TagsViewState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>
    & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>
};
export const store: Module<TagsViewState, RootState> = {
    state,
    mutations,
    actions
    // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
    // But without it, a bigger store might have clashes in namings
    // namespaced: true,
};
