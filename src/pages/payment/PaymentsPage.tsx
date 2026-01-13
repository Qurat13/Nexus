import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, History, Wallet, Send } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
export const PaymentsPage: React.FC = () => {
  const [balance] = useState(25000.00);
  const [history] = useState([
    { id: 1, type: 'Deposit', amount: 5000, date: '2026-01-10', status: 'Completed', person: 'Self' },
    { id: 2, type: 'Transfer', amount: -1200, date: '2026-01-11', status: 'Pending', person: 'Sarah Khan' },
    { id: 3, type: 'Withdraw', amount: -500, date: '2026-01-12', status: 'Completed', person: 'Bank Account' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Wallet className="text-indigo-600" /> Wallet & Payments
        </h1>
        <Badge className="bg-green-100 text-green-700 px-4 py-2 text-lg font-bold">
          Total Balance: ${balance.toLocaleString()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
    {/* Quick Actions - Ab ye white nahi, professional indigo nazar ayega */}
<Card className="bg-indigo-700 text-white overflow-hidden border-none shadow-lg shadow-indigo-200">
  <CardBody className="p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-indigo-500 rounded-lg">
        <Send size={20} className="text-white" />
      </div>
      <div>
        <h3 className="font-bold text-lg leading-tight text-indigo-700">Send Funds</h3>
        <p className="text-indigo-600 text-xs">Instant transfer to startups</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mb-1 block">Recipient Name</label>
        <input 
          type="text" 
          placeholder="e.g. Sarah Khan" 
          className="w-full bg-indigo-50 border border-indigo-500 rounded-lg p-3 text-indigo-700 placeholder:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
      </div>
      
      <div>
        <label className="text-[10px] uppercase tracking-wider text-indigo-600 font-bold mb-1 block">Amount ($)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600">$</span>
          <input 
            type="number" 
            placeholder="0.00" 
            className="w-full bg-indigo-50 border border-indigo-500 rounded-lg p-3 pl-7 text-indigo-700 placeholder:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      <Button className="w-full text-black hover:bg-indigo-50 font-bold py-3 rounded-xl shadow-md transition-transform active:scale-95 border-none">
        Transfer Now
      </Button>
    </div>
  </CardBody>
</Card>

        {/* Payment Mockup (Stripe Style) */}
        <Card className="md:col-span-2">
          <CardHeader><h2 className="text-lg font-semibold">Payment Methods</h2></CardHeader>
          <CardBody>
            <div className="flex items-center justify-between p-4 border rounded-xl bg-gray-50 border-gray-200">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded shadow-sm"><CreditCard className="text-gray-600" /></div>
                <div>
                  <p className="font-bold text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/28</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-600">Primary</Badge>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Transaction History Table */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <History size={20} /> <h2 className="text-lg font-semibold">Transaction History</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-4">Type</th>
                  <th className="p-4">Person/Entity</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 text-sm">
                    <td className="p-4 flex items-center gap-2">
                      {item.amount > 0 ? <ArrowDownLeft size={16} className="text-green-500" /> : <ArrowUpRight size={16} className="text-red-500" />}
                      {item.type}
                    </td>
                    <td className="p-4 font-medium">{item.person}</td>
                    <td className="p-4 text-gray-500">{item.date}</td>
                    <td className={`p-4 font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount > 0 ? '+' : ''}${Math.abs(item.amount)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};