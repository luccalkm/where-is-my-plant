export type TaskStep = {
    id: string;
    title: string;
    description?: string;
    xp: number;
};

export type TaskTheme = {
    id: string;
    name: string;
    tasks: TaskStep[];
};

export type TasksCatalog = {
    [category: string]: TaskTheme[];
};

export const tasksCatalog: TasksCatalog = {
    temperos: [
        {
            id: 'pimenta',
            name: 'Pimenta',
            tasks: [
                {
                    id: 'pimenta-1',
                    title: 'Escolha o vaso adequado',
                    description: 'Use um vaso com pelo menos 20cm de profundidade e furos para drenagem.',
                    xp: 8,
                },
                {
                    id: 'pimenta-2',
                    title: 'Adicione substrato fértil',
                    description: 'Misture terra vegetal com húmus de minhoca.',
                    xp: 8,
                },
                {
                    id: 'pimenta-3',
                    title: 'Plante as sementes ou mudas',
                    description: 'Plante a 1cm de profundidade, cubra levemente.',
                    xp: 10,
                },
                {
                    id: 'pimenta-4',
                    title: 'Regue sem encharcar',
                    description: 'Mantenha o solo úmido, mas nunca encharcado.',
                    xp: 7,
                },
                {
                    id: 'pimenta-5',
                    title: 'Coloque em local com sol',
                    description: 'A pimenteira precisa de pelo menos 4h de sol por dia.',
                    xp: 7,
                },
                {
                    id: 'pimenta-6',
                    title: 'Adube a cada 30 dias',
                    description: 'Use adubo orgânico para fortalecer a planta.',
                    xp: 10,
                },
                {
                    id: 'pimenta-7',
                    title: 'Colha quando os frutos estiverem maduros',
                    description: 'A pimenta estará pronta para colher quando atingir cor intensa.',
                    xp: 10,
                },
            ],
        },
        {
            id: 'agriao',
            name: 'Agrião',
            tasks: [
                {
                    id: 'agriao-1',
                    title: 'Escolha o recipiente adequado',
                    description: 'Pode ser vaso, jardineira ou garrafa PET cortada.',
                    xp: 6,
                },
                {
                    id: 'agriao-2',
                    title: 'Prepare o substrato',
                    description: 'Misture terra comum, areia e composto orgânico.',
                    xp: 8,
                },
                {
                    id: 'agriao-3',
                    title: 'Espalhe as sementes superficialmente',
                    description: 'Não cubra demais as sementes, apenas acomode levemente.',
                    xp: 7,
                },
                {
                    id: 'agriao-4',
                    title: 'Regue diariamente',
                    description: 'Solo sempre úmido, especialmente no início.',
                    xp: 7,
                },
                {
                    id: 'agriao-5',
                    title: 'Mantenha em local iluminado (mas sem sol direto)',
                    description: 'Agrião prefere meia sombra.',
                    xp: 6,
                },
                {
                    id: 'agriao-6',
                    title: 'Colha após 30 dias',
                    description: 'Colha as folhas com uma tesoura limpa.',
                    xp: 10,
                },
            ],
        },
        {
            id: 'manjericao',
            name: 'Manjericão',
            tasks: [
                {
                    id: 'manjericao-1',
                    title: 'Escolha um vaso de tamanho médio',
                    description: 'Vasos de 15 a 20cm são ideais.',
                    xp: 7,
                },
                {
                    id: 'manjericao-2',
                    title: 'Encha com terra rica em matéria orgânica',
                    description: 'Prefira mistura de terra preta e húmus.',
                    xp: 7,
                },
                {
                    id: 'manjericao-3',
                    title: 'Semeie superficialmente ou plante mudas',
                    description: 'Sementes a 0,5cm de profundidade.',
                    xp: 8,
                },
                {
                    id: 'manjericao-4',
                    title: 'Regue sem encharcar',
                    description: 'Solo úmido, mas nunca encharcado.',
                    xp: 6,
                },
                {
                    id: 'manjericao-5',
                    title: 'Deixe em local ensolarado',
                    description: 'Manjericão gosta de sol direto pelo menos 4h/dia.',
                    xp: 7,
                },
                {
                    id: 'manjericao-6',
                    title: 'Pode regularmente para crescer forte',
                    description: 'Retire flores para prolongar vida útil.',
                    xp: 8,
                },
                {
                    id: 'manjericao-7',
                    title: 'Colha as folhas quando necessário',
                    description: 'Sempre com tesoura limpa, para não machucar a planta.',
                    xp: 7,
                },
            ],
        },
        {
            id: 'cebolinha',
            name: 'Cebolinha',
            tasks: [
                {
                    id: 'cebolinha-1',
                    title: 'Escolha recipiente com pelo menos 15cm de profundidade',
                    description: 'Vasos pequenos ou jardineiras são ideais para cebolinha.',
                    xp: 7,
                },
                {
                    id: 'cebolinha-2',
                    title: 'Preencha com terra adubada',
                    description: 'Misture terra vegetal e composto orgânico.',
                    xp: 7,
                },
                {
                    id: 'cebolinha-3',
                    title: 'Plante sementes ou mudas',
                    description: 'Semeie superficialmente ou use talos enraizados.',
                    xp: 8,
                },
                {
                    id: 'cebolinha-4',
                    title: 'Regue diariamente sem encharcar',
                    description: 'Solo deve permanecer úmido.',
                    xp: 6,
                },
                {
                    id: 'cebolinha-5',
                    title: 'Coloque em local iluminado',
                    description: 'Cebolinha cresce melhor com sol indireto ou luz difusa.',
                    xp: 7,
                },
                {
                    id: 'cebolinha-6',
                    title: 'Colha a partir de 30 dias',
                    description: 'Use uma tesoura para cortar as folhas externas.',
                    xp: 10,
                },
            ],
        },
        {
            id: 'salsa',
            name: 'Salsa',
            tasks: [
                {
                    id: 'salsa-1',
                    title: 'Escolha recipiente médio',
                    description: 'Vaso ou jardineira com 15cm ou mais de profundidade.',
                    xp: 7,
                },
                {
                    id: 'salsa-2',
                    title: 'Prepare substrato leve e fértil',
                    description: 'Misture terra vegetal e composto orgânico.',
                    xp: 7,
                },
                {
                    id: 'salsa-3',
                    title: 'Semeie as sementes a 0,5cm de profundidade',
                    description: 'Cubra levemente e pressione o solo.',
                    xp: 8,
                },
                {
                    id: 'salsa-4',
                    title: 'Regue diariamente até germinar',
                    description: 'Solo sempre úmido, mas não encharcado.',
                    xp: 6,
                },
                {
                    id: 'salsa-5',
                    title: 'Deixe em local com sol pela manhã',
                    description: 'Salsinha aprecia sol suave e clima ameno.',
                    xp: 7,
                },
                {
                    id: 'salsa-6',
                    title: 'Colha após 60 dias',
                    description: 'Corte os talos externos primeiro.',
                    xp: 10,
                },
            ],
        },

    ],
    hortas: [
        {
            id: 'rucula',
            name: 'Rúcula',
            tasks: [
                {
                    id: 'rucula-1',
                    title: 'Escolha recipiente raso e largo',
                    description: 'Raiz superficial, ideal para jardineiras.',
                    xp: 7,
                },
                {
                    id: 'rucula-2',
                    title: 'Prepare terra rica em matéria orgânica',
                    description: 'Misture terra vegetal, húmus e areia.',
                    xp: 8,
                },
                {
                    id: 'rucula-3',
                    title: 'Semeie as sementes a 1cm de profundidade',
                    description: 'Espalhe as sementes e cubra levemente.',
                    xp: 8,
                },
                {
                    id: 'rucula-4',
                    title: 'Regue diariamente',
                    description: 'Solo deve estar sempre úmido.',
                    xp: 6,
                },
                {
                    id: 'rucula-5',
                    title: 'Coloque em local iluminado',
                    description: 'Rúcula cresce bem com sol da manhã ou sombra parcial.',
                    xp: 7,
                },
                {
                    id: 'rucula-6',
                    title: 'Colha em 30 a 40 dias',
                    description: 'Colha as folhas externas para consumo.',
                    xp: 10,
                },
            ],
        },
        {
            id: 'beterraba',
            name: 'Beterraba',
            tasks: [
                {
                    id: 'beterraba-1',
                    title: 'Escolha vaso ou canteiro profundo',
                    description: 'Beterraba desenvolve raiz arredondada.',
                    xp: 8,
                },
                {
                    id: 'beterraba-2',
                    title: 'Prepare solo solto, fértil e drenado',
                    description: 'Misture terra vegetal, areia e húmus.',
                    xp: 8,
                },
                {
                    id: 'beterraba-3',
                    title: 'Semeie a 2cm de profundidade',
                    description: 'Cubra as sementes com terra leve.',
                    xp: 7,
                },
                {
                    id: 'beterraba-4',
                    title: 'Regue frequentemente sem encharcar',
                    description: 'Solo úmido durante todo o ciclo.',
                    xp: 7,
                },
                {
                    id: 'beterraba-5',
                    title: 'Deixe em local com sol direto',
                    description: 'Beterraba precisa de 4 a 6h de sol.',
                    xp: 8,
                },
                {
                    id: 'beterraba-6',
                    title: 'Colha em 60 a 90 dias',
                    description: 'Retire toda a planta puxando pela base.',
                    xp: 12,
                },
            ],
        },

        {
            id: 'tomate',
            name: 'Tomate',
            tasks: [
                {
                    id: 'tomate-1',
                    title: 'Escolha vasos fundos ou canteiro',
                    description: 'Raiz do tomate precisa de espaço.',
                    xp: 10,
                },
                {
                    id: 'tomate-2',
                    title: 'Prepare solo rico e drenado',
                    description: 'Misture terra, areia e composto orgânico.',
                    xp: 10,
                },
                {
                    id: 'tomate-3',
                    title: 'Plante sementes ou mudas',
                    description: 'Plante a 1cm de profundidade.',
                    xp: 8,
                },
                {
                    id: 'tomate-4',
                    title: 'Regue com frequência, sem encharcar',
                    description: 'Solo deve estar sempre úmido.',
                    xp: 8,
                },
                {
                    id: 'tomate-5',
                    title: 'Deixe em local com sol direto',
                    description: 'Mínimo 6h de sol por dia.',
                    xp: 10,
                },
                {
                    id: 'tomate-6',
                    title: 'Adube a cada 15 dias',
                    description: 'Use adubo orgânico para crescimento.',
                    xp: 10,
                },
                {
                    id: 'tomate-7',
                    title: 'Use tutor para sustentar o caule',
                    description: 'Amarre o caule a uma estaca para evitar tombamento.',
                    xp: 8,
                },
                {
                    id: 'tomate-8',
                    title: 'Colha quando estiver vermelho',
                    description: 'Frutos maduros devem ser colhidos para incentivar produção.',
                    xp: 10,
                },
            ],
        },
        {
            id: 'alface',
            name: 'Alface',
            tasks: [
                {
                    id: 'alface-1',
                    title: 'Escolha recipiente raso e largo',
                    description: 'Alface tem raízes superficiais.',
                    xp: 7,
                },
                {
                    id: 'alface-2',
                    title: 'Prepare substrato leve',
                    description: 'Misture terra vegetal e composto orgânico.',
                    xp: 8,
                },
                {
                    id: 'alface-3',
                    title: 'Plante sementes a 0,5cm de profundidade',
                    description: 'Cubra levemente as sementes.',
                    xp: 7,
                },
                {
                    id: 'alface-4',
                    title: 'Regue diariamente, de manhã ou à tarde',
                    description: 'Evite molhar folhas.',
                    xp: 7,
                },
                {
                    id: 'alface-5',
                    title: 'Deixe em local iluminado, mas sem sol forte o dia todo',
                    description: 'Alface gosta de luz, mas sofre com sol forte.',
                    xp: 8,
                },
                {
                    id: 'alface-6',
                    title: 'Colha 30 a 45 dias após semear',
                    description: 'Corte próximo ao solo para evitar perder folhas.',
                    xp: 10,
                },
            ],
        },
        {
            id: 'cenoura',
            name: 'Cenoura',
            tasks: [
                {
                    id: 'cenoura-1',
                    title: 'Escolha vaso ou canteiro profundo',
                    description: 'Raiz da cenoura pode passar de 20cm.',
                    xp: 8,
                },
                {
                    id: 'cenoura-2',
                    title: 'Prepare solo solto e arenoso',
                    description: 'Facilita crescimento da raiz.',
                    xp: 8,
                },
                {
                    id: 'cenoura-3',
                    title: 'Semeie as sementes a 1cm de profundidade',
                    description: 'Distribua bem para evitar raízes tortas.',
                    xp: 7,
                },
                {
                    id: 'cenoura-4',
                    title: 'Mantenha solo sempre úmido',
                    description: 'Evite solo seco.',
                    xp: 7,
                },
                {
                    id: 'cenoura-5',
                    title: 'Não adube em excesso',
                    description: 'Evita deformação das raízes.',
                    xp: 7,
                },
                {
                    id: 'cenoura-6',
                    title: 'Colha após 80 a 100 dias',
                    description: 'Verifique se a raiz está gordinha.',
                    xp: 12,
                },
            ],
        },
    ],
};
