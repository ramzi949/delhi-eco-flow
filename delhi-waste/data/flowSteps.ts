import type { FlowStep } from './types';

export const flowSteps: FlowStep[] = [
  {
    id: 'generation',
    step: 1,
    title: 'Generation',
    intended:
      "Households separate wet waste, dry waste, and hazardous materials at home. Delhi's Solid Waste Management Rules 2016 legally require this.",
    reality:
      "Most households mix everything into one bag. The rules exist on paper — enforcement does not.",
    gap: 'Segregation fails before the waste even leaves the home.',
  },
  {
    id: 'segregation',
    step: 2,
    title: 'Segregation',
    intended:
      'Collection workers sort recyclables from residual waste. Wet and dry streams are kept separate.',
    reality:
      'Informal waste pickers do most of this sorting without pay or protection. The government spends money on incinerators instead of supporting the people doing the actual work.',
    gap: 'The system depends on informal labour it refuses to pay.',
  },
  {
    id: 'collection',
    step: 3,
    title: 'Collection',
    intended:
      'Door-to-door vehicles collect segregated waste on regular daily routes across all parts of the city.',
    reality:
      'Coverage is inconsistent. Responsibility is split between multiple government bodies, leading to gaps and no clear accountability.',
    gap: 'Divided responsibility means no one is accountable when collection fails.',
  },
  {
    id: 'transport',
    step: 4,
    title: 'Transport',
    intended:
      'Transfer stations sort waste and route each stream to the right processing facility.',
    reality:
      'Even when residents sort correctly, wet and dry waste often ends up in the same vehicle, undoing all household effort.',
    gap: 'Transfer stations undo household segregation before waste reaches processing.',
  },
  {
    id: 'processing',
    step: 5,
    title: 'Processing',
    intended:
      'Organic waste goes to compost or biogas. Dry recyclables go to recovery facilities.',
    reality:
      "Most of Delhi's waste is burned or sent to waste-to-energy incinerators that release more CO2 than they save. Organic waste alone causes about 24% of Delhi's winter air pollution.",
    gap: 'Both burning and current WTE release toxic chemicals. Neither is a real solution.',
  },
  {
    id: 'disposal',
    step: 6,
    title: 'Disposal',
    intended:
      'Only true residual waste reaches landfill. Sites are managed and capped to prevent fires.',
    reality:
      'Mixed, untreated waste is dumped every day at three landfills that officially reached capacity in 2008 and have never closed. The garbage mountain stands around 75 meters tall.',
    gap: 'The landfill is not the end of the chain. It is the failure of every step before it.',
  },
];
